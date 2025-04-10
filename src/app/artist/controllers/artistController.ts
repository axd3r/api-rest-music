import artistModel from "../models/artistModel";
import { Request, Response } from "express";

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
        const artistData = await artistModel.find().sort("name"); 
        return res.status(200).json({
            status: "Success",
            message: "Datos obtenidos correctamente",
            page,
            artistData,
            itemsPerPage
        });
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: "No se pudieron obtener los datos",
        });
    }
}

module.exports = {
    prueba,
    save,
    getById,
    list
}