import { Router, Request, Response } from 'express';
import { addUser } from '../db';
import { User } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const userData: User = req.body;
        const response = await addUser(userData);
        if(!response.error){
            res.status(201).send(response)
        }
        else{
            throw response.error;
        }
    } catch (error) {
        res.status(400).send({
            "message" : "An error occurred registering user"
        });
    }
});

export default router;