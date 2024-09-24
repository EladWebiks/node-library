import {Request,Response} from 'express';
import { User } from '../models/types.js';
import {v4 as uuidv4} from 'uuid';
import { readFromJsonFile, writeUserToJsonFile } from '../DAL/jsonUsers.js';
import bcrypt from 'bcrypt';

export const register = async(req:Request,res:Response)=>{
    try {
        const user: User = req.body;
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 10);
        user.books = [];
        await writeUserToJsonFile(user);
        res.status(201).json({userid:user.id})
    }
    catch (e) {

        res.status(500).send(e);
    }
}

export const login = async (req: Request, res: Response) => {
    
    try {
        const user: User = req.body;
        const users: User[] = await readFromJsonFile();
        const userFind: User | undefined = users.find((u) => { return u.userName == user.userName });
        if (userFind) {
            if (bcrypt.compareSync(user.password, userFind.password)) {
                res.status(200).json({ userid: userFind.id })
            }
            else{
                throw new Error("password incorect")
            }
        }
        else {
            throw new Error("password incorect")
        }
    }
    catch (e) {
        res.status(500).send(e)
    }



}

