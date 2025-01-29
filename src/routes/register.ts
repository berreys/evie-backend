import { Router, Request, Response } from 'express';
import { addUser } from '../db';
import { User } from '../types';

const router: Router = Router();

// Define the register route using POST
router.post('/', async (req: Request, res: Response) => {
    try {
        const userData: User = req.body;
        await addUser(userData);
        res.status(201).send({
            "message" : "database connected successfully!"
        })
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({
            "message" : "An error occurred registering user",
            "id" : null
        });
    }
});

export default router;