import { Request, Response, NextFunction } from "express";
import { Payload, verifyToken } from "../services/jwt.service";

export interface AuthenticatedRequest extends Request {
    user?: Payload;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({
            status: "error",
            message: "Token de authorizacion no proporcionado"
        });
        return;
    }
    const decoded = verifyToken(token);

    if (!decoded) {
        res.status(401).json({
            status: "error",
            message: "Token inválido o expirado.",
        });
        return;
    }

    req.user = decoded;
    next();
};