import { Router } from 'express';
import routes from '.';

const router = Router();

router.use('/cars', routes.cars);

export default router;
