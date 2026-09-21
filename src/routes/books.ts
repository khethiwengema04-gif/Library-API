import { Router, Request, Response } from 'express';
import { body, param, validationResult } from "express-validator";
import { createBooks, deleteBook } from "../controllers/books"
import { getAllBooks, getBooksById } from '../controllers/books';

const router = Router();

let users = [

    { id: 1, title: "Blind child", authorId: "2", year: "2026" }
]

router.get("/", getAllBooks);

router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    getBooksById(req, res)
}
);
router.post("/", [
    body("title").notEmpty().withMessage("title is required"),
    body("authorId").isEmail().withMessage("Must be valid authorId"),
    body("year").notEmpty().withMessage("year is required"),
], (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createBooks(req, res)

}
);



//  Added the DELETE route 
router.delete("/:id", [
    param("id").isInt().withMessage("ID must be an integer")
], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return deleteBook(req, res);
});


export default router