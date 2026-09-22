import { Router, Request, Response } from 'express';
import { body, param, validationResult } from "express-validator";
import { createBooks, deleteBook } from "../controllers/books"
import { getAllBooks, getBooksById } from '../controllers/books';

const router = Router();

let books = [

    { id: 1, title: "Blind child", authorId: 2, year: "2026" }
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
    body("authorId").isInt().withMessage("Author ID must be an integer"),
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

//update for the books
export const updateBook = (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id));

    const { title, authorId, year } = req.body;

    const bookIndex = books.findIndex(
        book => book.id === id
    );

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books[bookIndex] = { id, title, authorId: Number(authorId), year };

    res.status(200).json(books[bookIndex]);
};


export default router