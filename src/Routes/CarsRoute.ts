import { Router } from 'express';
import CarsController from '../Controllers/CarsController';

const router = Router();
const controller = new CarsController();

router.post('/', controller.create);

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.put('/:id', controller.updateById);

router.delete('/:id', controller.deleteById);

export default router;
