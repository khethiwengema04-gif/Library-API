import { Request, Response } from "express";
import { title } from "node:process";

export let books = [

    { id: 1, title: "Blind child", authorId: 2, year: "2026" }

]

export const getAllBooks = (req: Request, res: Response) => {
    res.status(200).json(books)
}
export const getBooksById = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = books.find((book) => book.id === parseInt(String(id)));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
}

export const createBooks = (req: Request, res: Response) => {
    const { title, authorId, year } = req.body;
    const newBooks = { id: books.length + 1, title, authorId, year };
    books.push(newBooks);
    res.status(201).json(newBooks);
}

export const deleteBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const bookId = parseInt(String(id));

    const bookExists = books.some((book) => book.id === bookId);

    if (!bookExists) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Filter out the book with the matching ID
    books = books.filter((book) => book.id !== bookId);
    res.status(200).json({ message: "Books deleted successfully" });
};

export const updateBook = (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id));
    const { title, authorId, year } = req.body;

    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    books[bookIndex] = { id, title, authorId, year };
    res.status(200).json(books[bookIndex]);
};
