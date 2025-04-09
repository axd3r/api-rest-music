import { Request, Response } from "express";

const prueba = (_req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Mensaje enviado desde: controllers/albumController.ts"
    });
}

module.exports = {
    prueba
}