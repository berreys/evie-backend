import { Router, Request, Response } from 'express';
import { addLatLongToCharger } from '../db';
import { ChargerAddLatLong } from '../types';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
            const chargerData: ChargerAddLatLong = req.body;
            console.log(chargerData);
            const response = await addLatLongToCharger(chargerData);
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
                "message" : "An error occurred updating charger."
            });
        }
});

export default router;