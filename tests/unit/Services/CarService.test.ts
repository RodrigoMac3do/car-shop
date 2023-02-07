import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import {
  car,
  cars,
  carWithoutStatus,
  carWithoutStatusOut,
} from '../../mocks/data';

describe('Testes da CarService', function () {
  describe('Testes com POST da rota /cars', function () {
    it('Teste de criação de novo carro com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(cars[0]);

      const service = new CarService();

      const result = await service.create(car);

      expect(result).to.be.deep.equal(cars[0]);
    });

    it('Teste de criação de novo carro sem status', async function () {
      sinon.stub(Model, 'create').resolves(carWithoutStatusOut);

      const service = new CarService();

      const result = await service.create(carWithoutStatus);

      expect(result).to.be.deep.equal(carWithoutStatusOut);
    });

    it('Teste de criação de noco carro sem propriedade', async function () {
      sinon.stub(Model, 'create').resolves(undefined);

      const service = new CarService();

      const result = await service.create(carWithoutStatus);

      expect(result).to.be.deep.equal(null);
    });
  });

  describe('Testes com GET da rota /cars', function () {
    it('Teste deve retornar lista de carros', async function () {
      sinon.stub(Model, 'find').resolves(cars);

      const service = new CarService();

      const result = await service.findAll();

      expect(result).to.be.deep.equal(cars);
    });

    it('Teste de falha ao passar ID inválido', async function () {
      sinon.stub(Model, 'findById').resolves(cars[0]);

      try {
        const service = new CarService();

        await service.findById('123121231werwrwe');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });

  describe('Testes com PUT da rota /cars', function () {
    // it('Teste se é possível alterar um carro com sucesso', async function () {
    //   sinon.stub(Model, 'findByIdAndUpdate').resolves(cars[0]);
    //   const service = new CarService();
    //   const result = await service.updateById(
    //     '63e2aae4135a458473a32730',
    //     cars[1],
    //   );
    //   expect(result).to.be.deep.equal(cars[1]);
    // });
    // it('Teste deve falhar ao tentar atualizar um carro inexistente', async function () {
    //   sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    //   try {
    //     const service = new CarService();
    //     await service.updateById('63e2aae4135a458473a32722', cars[1]);
    //   } catch (error) {
    //     expect((error as Error).message).to.be.equal('Car not found');
    //   }
    // });
  });

  describe('Teste com DELETE na rota /cars', function () {
    it('Teste se é possível excluir carro com sucesso', async function () {
      sinon.stub(Model, 'findById').resolves(cars[0]);
      sinon.stub(Model, 'findByIdAndRemove').resolves(null);

      const service = new CarService();

      const result = await service.deleteById('63e2aae4135a458473a32730');

      expect(result).to.be.deep.equal(undefined);
    });

    // it('Teste de falha ao tentar excluir carro ID errado', async function () {
    //   sinon.stub(Model, 'findById').resolves(cars[0]);

    //   try {
    //     const service = new CarService();

    //     await service.deleteById('63e1a7b2ae2cea3d8dcc32b8');
    //   } catch (error) {
    //     expect((error as Error).message).to.be.deep.equal('Car not Found');
    //   }
    // });
  });

  afterEach(function () {
    sinon.restore();
  });
});
