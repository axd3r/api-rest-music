import path from "path";
import artistModel from "../models/artistModel";
import { Request, Response } from "express";
import fs from "fs";
import albumModel from "../../album/models/albumModel";
import songModel from "../../song/models/songModel";

const prueba = (_req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Mensaje enviado desde: controllers/artistController.ts"
    });
}

const save = async (req: Request, res: Response) => {
    const data = req.body;
    const artistToSave = new artistModel(data);
    const save = await artistToSave.save(data);
    try {
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
    const params = req.params.id;
    try {
        const artist = await artistModel.findById(params);

        return res.status(200).json({
            status: "Success",
            message: "Datos obtenidos correctamente",
            data: artist
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudieron obtener los datos"
        });
    }
}

const list = async (req: Request, res: Response) => {

    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 5;

    try {
        const total = await artistModel.countDocuments();

        const artistData = await artistModel.find()
            .sort("name")
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        return res.status(200).json({
            status: "Success",
            message: "Datos obtenidos correctamente",
            page,
            total,
            totalPages: Math.ceil(total / itemsPerPage),
            artistData
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudieron obtener los datos",
        });
    }
}

const update = async(req:Request, res: Response) => {

    const artistId = req.params.id
    const data = req.body;

    const artistUpdate = await artistModel.findByIdAndUpdate(artistId, data, {new: true});

    try {
        return res.status(200).json({
            status: "success",
            message: "Datos actalizados correctamente",
            artistUpdate,
            data
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se actalizr los datos del artista",
        });
    }
}

const deleteArtist = async (req: Request, res: Response) => {
    const artistsId = req.params.id;

    try {
        await artistModel.findByIdAndDelete(artistsId, {new: true});
        return res.status(200).json({
            status: "Success",
            message: "Registro eliminado correctamente",
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar el registro",
        });
    }
}

const uplaod = async ( req:Request, res: Response) => {
    const artistId = req.params.file;
    const archivo = req.file;

    if (!archivo) {
        return res.status(400).json({
            status: "error",
            message: "No se ha subido ningún archivo.",
        });
    }

    try {
        const artist = await artistModel.findById(artistId)
        if(!artist){
            return res.status(404).json({
                status: "error",
                message: "Artista no encontrado.",
            });
        }
        const previousImage = artist.image
        
        if (previousImage) {
            const previousImagePath = path.resolve(__dirname, "../../../storage/image/artist", previousImage);
            if (fs.existsSync(previousImagePath)) {
                fs.unlink(previousImagePath, (err) => {
                    if (err) console.error("Error al borrar imagen anterior:", err);
                });
            }
        }

        artist.image = archivo.filename;
        await artist.save();

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
    const artistId = req.params.id
    
    try {
        const artistDeleted = await artistModel.findByIdAndDelete(artistId);
        if (!artistDeleted) {
            return res.status(404).json({
                status: "error",
                message: "Artista no encontrado",
            });
        }

        const albums = await albumModel.find({ artist: artistId });
        const albumIds = albums.map(album => album._id);

        await songModel.deleteMany({ album: { $in: albumIds } });

        await albumModel.deleteMany({ artist: artistId });

        return res.status(200).json({
            status: "success",
            message: "Artista, álbumes y canciones eliminados correctamente",
            artist: artistDeleted,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo actualizar la imagen del artista",
        });
    }
}

module.exports = {
    prueba,
    save,
    getById,
    list,
    update,
    deleteArtist,
    uplaod,
    remove
}