import { Router, Request, Response } from 'express';
import { addAvailability } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    // TODO: use addAvailability function in DB file to add an availability time slot for a charger
    res.status(201).send({});
});

export default router;