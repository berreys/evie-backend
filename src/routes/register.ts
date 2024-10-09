// import { Router, Request, Response } from 'express';
// import { addUser } from '../db';
// import { User } from '../types';

// const router: Router = Router();

// // Define the register route using POST
// router.post('/', async (req: Request, res: Response) => {
//     try {
//         const userData: User = req.body;
//         const result: string | null = await addUser(userData);
//         if (result) {
//             res.status(201).send(`User ${result} registered successfully.`);
//         } else {
//             res.status(400).send('Failed to register user.');
//         }
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).send('An error occurred while adding the user.');
//     }
// });

// export default router;