import { Request, Response } from "express";
import { books } from "./books";

let authors = [
    { id: 1, name: "Khethiwe Ngema", email: "khethy@gmail.com" },
    { id: 2, name: "Amanda Khuzwayo", email: "amanda@gmail.com" }
]

export const getAllAuthors = (req: Request, res: Response) => {
    res.status(200).json(authors)
}
export const getAuthorById = (req: Request, res: Response) => {
    const { id } = req.params;
    const author = authors.find((author) => author.id === parseInt(String(id)));
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
}

export const getBooksByAuthor = (req: Request, res: Response) => {
    const authorId = parseInt(String(req.params.id));

    const author = authors.find(author => author.id === authorId);

    if (!author) {
        return res.status(404).json({
            message: "Author not found"
        });
    }

    const authorBooks = books.filter(
        (book: { authorId: number }) => book.authorId === authorId
    );

    res.status(200).json({
        author,
        books: authorBooks
    });
};


export const createAuthor = (req: Request, res: Response) => {
    const { name, email } = req.body;
    const newAuthor = { id: authors.length + 1, name, email };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
}

export const deleteAuthor = (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = parseInt(String(id));

    const authorExists = authors.some((author) => author.id === authorId);

    if (!authorExists) {
        return res.status(404).json({ message: "Author not found" });
    }

    // Filtering out the author with the matching ID
    authors = authors.filter((author) => author.id !== authorId);
    res.status(200).json({ message: "Author deleted successfully" });
};

export const updateAuthor = (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id));
    const { name, email } = req.body;

    const authorIndex = authors.findIndex(a => a.id === id);
    if (authorIndex === -1) return res.status(404).json({ message: "Author not found" });

    authors[authorIndex] = { id, name, email };
    res.status(200).json(authors[authorIndex]);
};

