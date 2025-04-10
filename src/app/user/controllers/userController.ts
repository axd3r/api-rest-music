import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { createToken } from "../../../services/jwt.service";
import { AuthenticatedRequest } from "../../../middleware/authMiddleware"
import loginUserValidator from "../validators/loginUserValidator";
import findUserValidator from "../validators/findUserValidator";
import userValidator from "../validators/userValidators";
import userModel from "../models/userModel";
import path from "path";
import fs from "fs";

const prueba = (req: AuthenticatedRequest, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Mensaje enviado desde: controllers/userController.ts",
        data: req.user
    });
}

const save = async (req: Request, res: Response) => {

    const params = req.body;

    try {
        userValidator(params);
    } catch (error) {
        const err = error as Error;
        return res.status(200).send({
            status: "error",
            message: err.message
        })
    }
    const userExisting = await userModel.find({
        $or: [
            { email: params.email.toLowerCase() },
            { nick: params.nick.toLowerCase() }
        ]
    });

    if (userExisting.length > 0) {
        return res.status(500).json({
            status: "error",
            message: "El usuario ya existe"
        })
    }

    const pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    try {
        const userToSave = new userModel(params);

        const userStored: any = await userToSave.save(params);

        const { password, role, ...cleanUser } = userStored.toObject();
        return res.status(201).json({
            status: "success",
            user: cleanUser,
        });

    } catch (error) {
        const err = error as Error;
        return res.status(400).send({
            status: "error",
            message: err.message
        })
    }
}

const login = async (req: Request, res: Response) => {

    const params = req.body;

    try {
        loginUserValidator(params);

        const userExisting = await userModel.findOne({
            email: params.email
        }).select("+password").lean();

        if (!userExisting) {
            return res.status(400).json({
                status: "error",
                message: "Correo no encontrado"
            })
        }

        const pwd = bcrypt.compareSync(params.password, userExisting.password)

        if (!pwd) {
            return res.status(400).json({
                status: "error",
                messsage: "Contraseña incorrecta"
            })
        }
        const token = createToken({
            id: userExisting._id.toString(),
            name: userExisting.name,
            nick: userExisting.nick,
            email: userExisting.email,
            role: userExisting.role,
            image: userExisting.image
        });

        return res.status(200).json({
            status: "success",
            message: "Te has identificado correctamente",
            user: {
                id: userExisting._id,
                name: userExisting.name,
                nick: userExisting.nick,
                email: userExisting.email
            },
            token
        });

    } catch (error) {
        const err = error as Error;
        return res.status(400).send({
            status: "error",
            message: err.message
        })
    }
}

const profile = async (req: Request, res: Response) => {

    const { userId } = req.params;

    try {
        findUserValidator({ userId });

        const regexQuery = new RegExp("^" + userId + "$", "i");
        const objectIdQuery = mongoose.Types.ObjectId.isValid(userId)
            ? { _id: userId }
            : null;

        const userFind = await userModel.findOne({
            $or: [
                ...(objectIdQuery ? [objectIdQuery] : []),
                { email: userId.toLowerCase() },
                { name: regexQuery },
                { nick: regexQuery },
            ]
        }).select("-password, -created_at, -__v");

        if (!userFind) {
            return res.status(500).json({
                status: "error",
                message: "No se encontro el usuario"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario encontrado!!",
            data: userFind
        });
    } catch (error) {
        const err = error as Error;

        return res.status(500).json({
            status: "error",
            message: err.message || "Ocurrió un error al obtener el perfil"
        });
    }
}

const update = async (req: AuthenticatedRequest, res: Response) => {

    const data = req.body;
    const userR = req.user;

    try {

        const users = await userModel.find({
            $or: [
                { email: data?.email.toLowerCase() },
                { nick: data?.nick.toLowerCase() },
            ]
        }).exec();

        let userIsset = false;

        users.forEach(user => {
            if (user && user._id.toString() !== userR?.id) userIsset = true;
        });

        if (userIsset) {
            return res.status(200).json({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const dataUpdated = await userModel.findByIdAndUpdate(userR?.id, data, { new: true });

        if (!dataUpdated) {
            return res.status(500).json({
                statsus: "Error",
                message: "No se pudo actualizar"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Actualizaicon de datos completada",
            dataUpdated
        });
    } catch (error) {
        const err = error as Error;

        return res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const upload = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            message: "Peticion invalida:  no se pudo subir ninguna imagen"
        });
    }

    const archivo = req.file?.originalname
    const filePath = req.file?.path

    if (!archivo || !filePath) {
        return res.status(400).json({
            status: "error",
            message: "Nombre del archivo no disponible",
        });
    }

    const archivo_extension = path.extname(archivo).toLowerCase().substring(1);

    if (!["png", "jpg", "jpeg", "gif"].includes(archivo_extension)) {
        fs.unlink(filePath, (error) => {
            if (error) {
                console.error("Error al intentar borrar el archivo: ", error);
            }
            return res.status(400).json({
                status: "error",
                message: "Imagen invalida: formato no permitido",
            });
        });
        return
    }

    const userLoged = req.user;
    try {
        const user = await userModel.findById(userLoged?.id);
        const oldImage = user?.image;

        const userUpdated = await userModel.findOneAndUpdate(
            { _id: userLoged?.id },
            { image: req.file?.filename },
            { new: true }
        )

        if (oldImage) {
            const oldImagePath = path.join(__dirname, "../../../storage/image/user/", oldImage);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error("No se pudo eliminar la imagen anterior: ", err.message);
                } else {
                    console.log("Imagen anterior eliminada:", oldImage);
                }
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Acuatlizacion de foto completa",
            data: userUpdated,
            ficero: req.file
        });
    } catch (error) {
        const err = error as Error;

        return res.status(400).json({
            status: "success",
            message: "Error al actualizar foto",
            error: err.message
        });
    }
}

const avatar = (req: AuthenticatedRequest, res: Response) => {
    const file = req.params.file;
    const filePath = path.join(__dirname, "../../../storage/image/user/", file);
    console.log(filePath);
    
    if(!fs.existsSync(filePath)){
        return res.status(404).json({
            status: "error",
            message: "No se pudo encontrar la imagen",
        })
    }
    
    return res.sendFile(path.resolve(filePath));
}

module.exports = {
    prueba,
    save,
    login,
    profile,
    update,
    upload,
    avatar
}