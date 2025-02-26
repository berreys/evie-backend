import { Router, Request, Response } from 'express';
import { getChargers } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    // TODO: use the getChargers function from the DB file to retrieve a list of all available chargers. 
    // (Don't worry about pagination or getting a specific number of them for now)
    res.status(201).send({});
});

export default router;