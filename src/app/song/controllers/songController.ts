import { Request, Response } from "express";
import songModel from "../models/songModel";
import fs from "fs";
import path from "path";

const prueba = (_req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Mensaje enviado desde: controllers/songController.ts"
    });
}

const save = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        if (req.file) {
            data.file = req.file.filename;
        }
        const song = new songModel(data);
        const savedSong = await song.save();

        return res.status(200).json({
            status: "Success",
            message: "Canción guardada correctamente",
            song: savedSong
        });
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({
            status: "error",
            message: "No se pudo guardar la cancion" + err.message
        })
    }
}

const getById = async ( req: Request, res: Response) => {
    const songId = req.params.songId;

    try {
        const song = await songModel.findById(songId)
            .select("-created_at -__v")
            .populate({ path: "album", select: "-created_at -__v", populate: {
                path: "artist", 
                model: "Artist", 
                select: "-created_at -__v"}
            });
        if(!song) {
            return res.status(404).json({
                status: "error",
                message: "La cancion no existe"
            });
        }
        
        return res.status(200).json({
            status: "Success",
            message: "Canción guardada correctamente",
            song: song
        });
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({
            status: "error",
            message: "No se pudo guardar la cancion" + err.message
        });
    }
}

const getAll = async (req: Request, res: Response) => {
    const albumId = req.params.albumId;
    try {
        const song = await songModel.find({album: albumId})
            .select("-created_at -__v")
            .populate({ path: "album", select: "-created_at -__v", populate: {
                path: "artist", 
                model: "Artist", 
                select: "-created_at -__v"}
            });
        return res.status(200).json({
            status: "Success",
            message: "Canción guardada correctamente",
            song: song
        });
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({
            status: "error",
            message: "No se pudo guardar la cancion" + err.message
        });
    }
}

const update = async (req: Request, res: Response) => {
    const songId = req.params.songId;
    const songData = req.body;
    try {
        const songUpdate = await songModel.findByIdAndUpdate(songId, songData, {new: true});
        return res.status(200).json({
            status: "Success",
            message: "Canción guardada correctamente",
            song: songUpdate
        });
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({
            status: "error",
            message: "No se pudo guardar la cancion" + err.message
        });
    }
}

const deleteSong = async (req: Request, res: Response) => {
    const songId = req.params.id;
    try {
        await songModel.findByIdAndDelete(songId);
        return res.status(200).json({
            status: "Success",
            message: "Registro eliminado correctamente",
        });
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar la cancion" + err.message
        });
    }
}

const upload = async (req: Request, res: Response) => {
    const songId = req.params.songId;

    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                status: "error",
                message: "No se envió ningún archivo"
            });
        }

        const song = await songModel.findById(songId);
        if (!song) {
            fs.unlinkSync(file.path);
            return res.status(404).json({
                status: "error",
                message: "Canción no encontrada"
            });
        }

        if (typeof song.file === "string" && song.file !== "default.mp3") {
            const oldFilePath = path.join(__dirname, "../../../storage/media/song/", song.file);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }
        

        song.file = file.filename;
        const updatedSong = await song.save();

        return res.status(200).json({
            status: "success",
            message: "Archivo actualizado correctamente",
            song: updatedSong
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al subir el archivo",
            error
        });
    }
};

module.exports = {
    prueba,
    save,
    getById,
    getAll,
    update,
    deleteSong,
    upload
}