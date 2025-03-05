import { Router, Request, Response } from 'express';
import { addAvailability } from '../db';
import { Availability } from '../types';


const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
            const availabilityData: Availability = req.body;
            const response = await addAvailability(availabilityData);
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
                "message" : "An error occurred adding availability."
            });
        }
});

export default router;