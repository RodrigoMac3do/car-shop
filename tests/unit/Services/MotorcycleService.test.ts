import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcycle,
  motorcycles,
  motorcycleWithoutStatus,
  motorcycleWithoutStatusOut,
} from '../../mocks/data';

describe('Testes da MotorcycleService', function () {
  describe('Testes com POST da rota /motorcycles', function () {
    it('Teste de criação de nova moto com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(motorcycles[0]);

      const service = new MotorcycleService();

      const result = await service.create(motorcycle);

      expect(result).to.be.deep.equal(motorcycles[0]);
    });

    it('Teste de criação de nova moto sem status', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleWithoutStatusOut);

      const service = new MotorcycleService();

      const result = await service.create(motorcycleWithoutStatus);

      expect(result).to.be.deep.equal(motorcycleWithoutStatusOut);
    });

    it('Teste de criação de nova moto sem propriedade', async function () {
      sinon.stub(Model, 'create').resolves(undefined);

      const service = new MotorcycleService();

      const result = await service.create(motorcycleWithoutStatus);

      expect(result).to.be.deep.equal(null);
    });
  });

  describe('Testes com GET da rota /motorcycles', function () {
    it('Teste deve retornar lista de motos', async function () {
      sinon.stub(Model, 'find').resolves(motorcycles);

      const service = new MotorcycleService();

      const result = await service.findAll();

      expect(result).to.be.deep.equal(motorcycles);
    });

    it('Teste de falha ao passar ID inválido', async function () {
      sinon.stub(Model, 'findById').resolves(motorcycles[0]);

      try {
        const service = new MotorcycleService();

        await service.findById('63e2b814135a458473a3275q');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });

  describe('Testes com PUT da rota /motorcycles', function () {
    // it('Teste se é possível alterar um carro com sucesso', async function () {
    //   sinon.stub(Model, 'findByIdAndUpdate').resolves(cars[0]);
    //   const service = new MotorcycleService();
    //   const result = await service.updateById(
    //     '63e2aae4135a458473a32730',
    //     motorcycles[1],
    //   );
    //   expect(result).to.be.deep.equal(motorcycles[1]);
    // });
    // it('Teste deve falhar ao tentar atualizar um carro inexistente', async function () {
    //   sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    //   try {
    //     const service = new MotorcycleService();
    //     await service.updateById('63e2aae4135a458473a32722', motorcycles[1]);
    //   } catch (error) {
    //     expect((error as Error).message).to.be.equal('Motorcycle not found');
    //   }
    // });
  });

  describe('Teste com DELETE na rota /motorcycles', function () {
    it('Teste se é possível excluir moto com sucesso', async function () {
      sinon.stub(Model, 'findById').resolves(motorcycles[0]);
      sinon.stub(Model, 'findByIdAndRemove').resolves(null);

      const service = new MotorcycleService();

      const result = await service.deleteById('63e2aae4135a458473a32730');

      expect(result).to.be.deep.equal(undefined);
    });

    // it('Teste de falha ao tentar excluir uma moto com ID errado', async function () {
    //   sinon.stub(Model, 'findById').resolves(motorcycles[0]);

    //   try {
    //     const service = new MotorcycleService();

    //     await service.deleteById('63e1a7b2ae2cea3d8dcc32b8');
    //   } catch (error) {
    //     expect((error as Error).message).to.be.deep.equal('Motorcycle not Found');
    //   }
    // });
  });

  afterEach(function () {
    sinon.restore();
  });
});
