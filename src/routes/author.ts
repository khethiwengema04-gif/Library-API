import { Router, Request, Response } from 'express';
import { getAllAuthors } from '../controllers/author';
import { body, param, validationResult } from "express-validator";
import { getAuthorById, createAuthor, deleteAuthor } from "../controllers/author"

const router = Router();

let users = [
    { id: 1, name: "Khethiwe Ngema", email: "khethy@gmail.com" },
    { id: 2, name: "Amanda Khuzwayo", email: "amanda@gmail.com" }
]

router.get("/", getAllAuthors);

router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    getAuthorById(req, res)
}
);
router.post("/", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be valid email address"),
], (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    createAuthor(req, res)

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

    // Explicitly call and return your delete controller
    return deleteAuthor(req, res);
});


export default router