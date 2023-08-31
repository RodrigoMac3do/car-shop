import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = Router();
const controller = new MotorcycleController();

router.post('/', controller.create);

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.put('/:id', controller.updateById);

router.delete('/:id', controller.deleteById);

export default router;
