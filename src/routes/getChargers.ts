import { Router, Request, Response } from 'express';
import { getChargers } from '../db';
import { UserLogin } from '../types';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const response: any = await getChargers();
        if(!response.error){
            res.status(201).send(response);
        }
        else{
            throw response.error;
        }
    }
    catch (error) {
        res.status(400).send({
            "message": "An error occurred getting charger data."
        });
    }
    
});

export default router;