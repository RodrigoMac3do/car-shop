import { Router } from 'express';
import routes from '.';

const router = Router();

router.use('/cars', routes.cars);

router.use('/motorcycles', routes.motorcycles);

export default router;
