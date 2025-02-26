import { Router, Request, Response } from 'express';
import { login } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const credentials: UserLogin = req.body;
    const successfulLogin = await login(credentials);
    if(successfulLogin){
        res.status(201).send({message: 'Successful login.'});
    }
    else{
        res.status(400).send({message: 'Invalid credentials.'});
    }
});

export default router;