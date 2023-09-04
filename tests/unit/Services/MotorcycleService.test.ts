import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcycle,
  motorcycles,
  motorcycleUpdate,
  motorcycleWithoutStatus,
  motorcycleWithoutStatusOut,
} from '../../mocks/data';

describe('Testes da MotorcycleService', function () {
  const service = new MotorcycleService();

  beforeEach(function () {
    sinon.restore();
  });
  describe('Testes com POST da rota /motorcycles', function () {
    it('Teste de criação de nova moto com sucesso', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(motorcycles[0]);

      const result = await service.create(motorcycle);

      expect(result).to.be.deep.equal(motorcycles[0]);
    });

    it('Teste de criação de nova moto sem status', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(motorcycleWithoutStatusOut);

      const result = await service.create(motorcycleWithoutStatus);

      expect(result).to.be.deep.equal(motorcycleWithoutStatusOut);
    });

    it('Teste de criação de nova moto sem propriedade', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(undefined);

      const result = await service.create(motorcycleWithoutStatus);

      expect(result).to.be.deep.equal(null);
    });
  });

  describe('Testes com GET da rota /motorcycles', function () {
    it('Teste deve retornar lista de motos', async function () {
      sinon.stub(mongoose.Model, 'find').resolves(motorcycles);

      const result = await service.findAll();

      expect(result).to.be.deep.equal(motorcycles);
    });

    it('Teste de falha ao passar ID inválido', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(null);

      try {
        await service.findById('1');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  describe('Testes com PUT da rota /motorcycles', function () {
    it('Deve atualizar um carro', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(motorcycles[0]);
      sinon
        .stub(mongoose.Model, 'findByIdAndUpdate')
        .resolves(motorcycleUpdate);

      const result = await service.updateById(
        '63e2adb7135a458473a3274b',
        motorcycleUpdate,
      );

      expect(result).to.be.deep.equal({
        id: motorcycles[0].id,
        ...motorcycleUpdate,
      });
    });
  });

  describe('Teste com DELETE na rota /motorcycles', function () {
    it('Teste se é possível excluir moto com sucesso', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(motorcycles[0]);
      sinon.stub(mongoose.Model, 'findByIdAndRemove').resolves(null);

      const result = await service.deleteById('63e2aae4135a458473a32730');

      expect(result).to.be.deep.equal(undefined);
    });
  });
});
