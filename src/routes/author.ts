import { Router, Request, Response } from 'express';
import { getAllAuthors } from '../controllers/author';
import { body, param, validationResult } from "express-validator";
// import {getAllUsers, getUserById, createUser} from "../controllers/users"

const router = Router();

let users = [
    {id:1, name:"Khethiwe Ngema", email: "khethy@gmail.com"},
    {id: 2, name: "Amanda Khuzwayo", email: "amanda@gmail.com"}
]

router.get("/", getAllAuthors);

router.get("/:id",[param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req); 
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
     getUserById(req,res) 
}
);
