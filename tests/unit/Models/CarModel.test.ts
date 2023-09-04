import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarModel from '../../../src/Models/CarODM';
import { car, cars, carUpdate } from '../../mocks/cars.mock';

describe('Car Model', function () {
  const model = new CarModel();

  afterEach(function () {
    sinon.restore();
  });

  it('Deve criar um carro', async function () {
    sinon.stub(Model, 'create').resolves(cars[0]);

    const response = await model.create(car);

    expect(response).to.be.deep.equal(cars[0]);
  });

  it('Deve retornar todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(cars);

    const response = await model.findAll();

    expect(response).to.be.deep.equal(cars);
  });

  it('Deve retornar um carro por id', async function () {
    sinon.stub(Model, 'findById').resolves(cars[1]);

    const response = await model.findById('63e2aae4135a458473a32732');

    expect(response).to.be.deep.equal(cars[1]);
  });

  it('Deve retornar null se o id do carro não for encontrado', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const response = await model.findById('63e2aae4135a458473a327999');

    expect(response).to.be.deep.equal(null);
  });

  it('Deve atualizar um carro', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdate);

    const response = await model.updateById(
      '63e2aae4135a458473a32732',
      carUpdate,
    );

    expect(response).to.be.deep.equal(carUpdate);
  });

  it('Deve retornar null se a carro para ser atualizado não existir', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const response = await model.updateById(
      '63e2aae4135a458473a327999',
      carUpdate,
    );

    expect(response).to.be.deep.equal(null);
  });
});
