import { Request, Response } from "express";
import albumModel from "../models/albumModel";
import path from "path";
import fs from "fs";
import songModel from "../../song/models/songModel";

const prueba = (_req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Mensaje enviado desde: controllers/albumController.ts"
    });
}

const save = async ( req: Request, res: Response) => {
    const data = req.body;
    const dataSave = new albumModel(data);

    try {
        const save = await dataSave.save(data);
        return res.status(200).json({
            status: "Success",
            message: "Datos creados",
            save
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo guardar"
        });
    }
}

const getById = async (req: Request, res: Response) => {
    const albumId = req.params.id;

    try {
        const album = await albumModel.findById(albumId)
            .select("-created_at -__v")
            .populate("artist", "-created_at -__v");
        if(!album) {
            return res.status(400).json({
                status: "error",
                message: "El id no es valido"
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Datos obtenidos correctamente",
            data: album
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo extraer los datos"
        });
    }
}

const getAll = async (req: Request, res: Response) => {
    const artistId = req.params.artistId;
    try {
        const albumData = await albumModel.find({artist: artistId}).select("-created_at -__v")
        .populate("artist", "-created_at -__v");
        return res.status(200).json({
            status: "Success",
            message: "Datos obtenidos correctamente",
            data: albumData
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo extraer los datos"
        });
    }
}

const update = async ( req: Request, res: Response) => {
    const albumId = req.params.albumId;

    const albumData = req.body;

    try {
        const album  = await albumModel.findByIdAndUpdate(albumId, albumData, {new: true});

        return res.status(200).json({
            status: "Success",
            message: "Datos obtenidos correctamente",
            data: album
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo extraer los datos"
        });
    }
}

const upload = async ( req:Request, res: Response) => {
    const albumId = req.params.albumId;
    const archivo = req.file;

    if (!archivo) {
        return res.status(400).json({
            status: "error",
            message: "No se ha subido ningún archivo.",
        });
    }

    try {
        const album = await albumModel.findById(albumId)
        if(!album){
            return res.status(404).json({
                status: "error",
                message: "Album no encontrado.",
            });
        }
        const previousImage = album.image
        
        if (previousImage) {
            const previousImagePath = path.resolve(__dirname, "../../../storage/image/album", previousImage);
            if (fs.existsSync(previousImagePath)) {
                fs.unlink(previousImagePath, (err) => {
                    if (err) console.error("Error al borrar imagen anterior:", err);
                });
            }
        }

        album.image = archivo.filename;
        await album.save();

        return res.status(200).json({
            status: "Success",
            message: "Imagen actualizada",
            image: archivo.filename
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo actualizar la imagen del artista",
        });
    }
}

const remove = async ( req: Request, res: Response) => {
    const albumId = req.params.id;

    try {
        const albumDeleted = await albumModel.findByIdAndDelete(albumId);
        if (!albumDeleted) {
            return res.status(404).json({
                status: "error",
                message: "Álbum no encontrado",
            });
        }

        await songModel.deleteMany({ album: albumId });

        return res.status(200).json({
            status: "success",
            message: "Álbum y canciones eliminados correctamente",
            album: albumDeleted,
        });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar el álbum y sus canciones: " + err.message,
        });
    }
};

module.exports = {
    prueba,
    save,
    getById,
    getAll,
    update,
    upload,
    remove
}