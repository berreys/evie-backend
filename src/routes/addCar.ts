import { Router, Request, Response } from 'express';
import { addCar } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    // TODO: use addCar function in DB file to add a vehicle for a user
    res.status(201).send({});
});

export default router;