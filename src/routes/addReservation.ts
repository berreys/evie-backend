import { Router, Request, Response } from 'express';
import { addReservation } from '../db';
import { Reservation } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
            const reservationData: Reservation = req.body;
            console.log(reservationData);
            const response = await addReservation(reservationData);
            if(!response.error){
                res.status(201).send({id: response})
            }
            else{
                throw response.error;
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send({
                "message" : "An error occurred adding reservation."
            });
        }
});

export default router;