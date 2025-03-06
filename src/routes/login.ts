import { Router, Request, Response } from 'express';
import { login } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const credentials: UserLogin = req.body;
    const response = await login(credentials);
    if(!response?.error){
        res.status(201).send(response);
    }
    else{
        res.status(400).send(response);
    }
});

export default router;