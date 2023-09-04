import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import MotorcycleModel from '../../../src/Models/MotorcycleODM';
import {
  motorcycle,
  motorcycleUpdate,
  motorcycles,
} from '../../mocks/motorcycle.mock';

describe('Motorcycle Model', function () {
  const model = new MotorcycleModel();

  afterEach(function () {
    sinon.restore();
  });

  it('Deve criar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycles[0]);

    const response = await model.create(motorcycle);

    expect(response).to.be.deep.equal(motorcycles[0]);
  });

  it('Deve retornar todas as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcycles);

    const response = await model.findAll();

    expect(response).to.be.deep.equal(motorcycles);
  });

  it('Deve retornar uma moto por id', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycles[1]);

    const response = await model.findById('63e2adb7135a458473a3274d');

    expect(response).to.be.deep.equal(motorcycles[1]);
  });

  it('Deve retornar null se o id da moto não for encontrado', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const response = await model.findById('63e2adb7135a458473a3274d');

    expect(response).to.be.deep.equal(null);
  });

  it('Deve atualizar uma moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleUpdate);

    const response = await model.updateById(
      '63e2adb7135a458473a3274d',
      motorcycleUpdate,
    );

    expect(response).to.be.deep.equal(motorcycleUpdate);
  });

  it('Deve retornar null se a moto para ser atualizada não existir', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const response = await model.updateById(
      '63e2adb7135a458473a3274d',
      motorcycleUpdate,
    );

    expect(response).to.be.deep.equal(null);
  });
});
