import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        error: "Not Found",
        message: `The request URL ${req.originalUrl} was not found`
    })
}