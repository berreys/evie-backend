import { Router, Request, Response } from 'express';
import { getAppointments } from '../db';
import { GetAppointmentsData, UserLogin } from '../types';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // Access query parameters
        const username = req.query.username as string;
        const isChargerOwner = req.query.isChargerOwner === "true"; // Convert string to boolean

        // Prepare the data as required by the database function
        const reqData: GetAppointmentsData = {
            username,
            isChargerOwner
        };

        const response: any = await getAppointments(reqData);
        if (!response.error) {
            res.status(200).send(response);  // Return a success response with status 200
        } else {
            throw response.error;
        }
    } catch (error) {
        res.status(400).send({
            "message": "An error occurred getting appointment data."
        });
    }
});

export default router;
