import { Router, Request, Response } from 'express';
import { addReservation } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    // TODO: use addReservation function in DB file to add a reservation for a user and charger
    res.status(201).send({});
});

export default router;