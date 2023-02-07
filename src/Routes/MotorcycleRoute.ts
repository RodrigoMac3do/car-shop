import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = Router();

router.post('/', (req, res, next) =>
  new MotorcycleController(req, res, next).create());

router.get('/', (req, res, next) =>
  new MotorcycleController(req, res, next).findAll());

router.get('/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).findById());

export default router;
