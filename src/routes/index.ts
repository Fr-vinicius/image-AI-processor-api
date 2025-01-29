import {Router} from 'express';

import measurementsRouter from './Measurements.routes';
import geminiRouter from './geminiRoutes';

const routes = Router();


export default routes;

routes.use('/gemini' , geminiRouter);
routes.use('/measurements' , measurementsRouter);