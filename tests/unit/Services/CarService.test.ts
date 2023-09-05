import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import CarService from '../../../src/Services/CarService';
import {
  car,
  cars,
  carUpdate,
  carWithoutStatus,
  carWithoutStatusOut,
} from '../../mocks/cars.mock';

describe('Testes da CarService', function () {
  const service = new CarService();

  beforeEach(function () {
    sinon.restore();
  });

  describe('Testes com POST da rota /cars', function () {
    it('Teste de criação de novo carro com sucesso', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(cars[0]);

      const result = await service.create(car);

      expect(result).to.be.deep.equal(cars[0]);
    });

    it('Teste de criação de novo carro sem status', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(carWithoutStatusOut);

      const result = await service.create(carWithoutStatus);

      expect(result).to.be.deep.equal(carWithoutStatusOut);
    });

    it('Teste de criação de noco carro sem propriedade', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(undefined);

      const result = await service.create(carWithoutStatus);

      expect(result).to.be.deep.equal(null);
    });
  });

  describe('Testes com GET da rota /cars', function () {
    it('Teste deve retornar lista de carros', async function () {
      sinon.stub(mongoose.Model, 'find').resolves(cars);

      const result = await service.findAll();

      expect(result).to.be.deep.equal(cars);
    });

    it('Teste de falha ao passar ID inválido', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(null);

      try {
        await service.findById('1');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
  });

  describe('Testes com PUT da rota /cars', function () {
    it('Deve atualizar um carro', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(cars[0]);
      sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(carUpdate);

      const result = await service.updateById(
        '63e2aae4135a458473a32730',
        carUpdate,
      );

      expect(result).to.be.deep.equal({
        id: cars[0].id,
        ...carUpdate,
      });
    });
  });

  describe('Teste com DELETE na rota /cars', function () {
    it('Teste se é possível excluir carro com sucesso', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(cars[0]);
      sinon.stub(mongoose.Model, 'findByIdAndRemove').resolves(null);

      const result = await service.deleteById('63e2aae4135a458473a32730');

      expect(result).to.be.deep.equal(undefined);
    });
  });
});
