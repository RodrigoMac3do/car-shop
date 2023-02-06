import { Router } from 'express';
import CarsController from '../Controllers/CarsControllers';

const router = Router();

router.post('/', (req, res, next) =>
  new CarsController(req, res, next).create());

export default router;
