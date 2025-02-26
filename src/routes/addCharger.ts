import { Router, Request, Response } from 'express';
import { addCharger } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    // TODO: use addCharger function in DB file to add a charger to DB and associate it with the user
    res.status(201).send({});
});

export default router;