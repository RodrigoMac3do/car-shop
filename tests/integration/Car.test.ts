import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import request = require('supertest');
import app from '../../src/app';
import { car, carUpdate, cars, invalidMongoId } from '../mocks/data';

describe('Car', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('GET /cars', function () {
    it('Deve retornar todos os carros', async function () {
      sinon.stub(mongoose.Model, 'find').resolves(cars);

      const res = await request(app).get('/cars');

      expect(res.body).to.deep.equal(cars);
      expect(res.body).to.be.an('array');
    });

    it('Deve retornar um carro', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(cars[0]);

      const res = await request(app).get(`/cars/${cars[0].id}`);

      expect(res.body.id).to.deep.equal(cars[0].id);
      expect(res.body.id).to.not.deep.equal(cars[1].id);
    });

    it('Deve retornar status 404 quando não encontrar carro', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(null);

      const res = await request(app).get(`/cars/${cars[0].id}`);

      expect(res.status).to.deep.equal(404);
      expect(res.body).to.have.property('message');
    });

    it('Deve retornar status 422 quando mongo id for inválido', async function () {
      sinon.stub(mongoose, 'isValidObjectId').callsFake(() => false);

      const res = await request(app).get('/cars/1');

      expect(res.status).to.equal(422);
      expect(res.body).to.have.property('message', invalidMongoId);
    });
  });

  describe('POST /cars', function () {
    it('Deve criar um carro', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(car);

      const res = await request(app).post('/cars').send(car);

      expect(res.status).to.deep.equal(201);
      expect(res.body).to.deep.equal(car);
    });
  });

  describe('PUT /cars/:id', function () {
    it('Deve atualizar um carro', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(cars[0]);
      sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(carUpdate);

      const res = await request(app).put(`/cars/${cars[0].id}`).send(carUpdate);

      expect(res.status).to.deep.equal(200);
      expect(res.body).to.deep.equal({
        id: cars[0].id,
        ...carUpdate,
      });
    });

    it('Deve retornar 404 quando o carro não for encontrado', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(null);
      sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(null);

      const res = await request(app).put(`/cars/${cars[0].id}`).send(car);

      expect(res.status).to.deep.equal(404);
      expect(res.body).to.deep.property('message', 'Car not found');
    });

    it('Deve retornar status 422 quando mongo id inválido', async function () {
      const res = await request(app).put('/cars/3ab2');

      expect(res.status).to.deep.equal(422);
      expect(res.body).to.deep.property('message', invalidMongoId);
    });
  });

  describe('DELETE /cars/:id', function () {
    it('Deve retornar 404 quando o carro não for encontrado', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(cars[0]);
      sinon.stub(mongoose.Model, 'findByIdAndRemove').resolves(null);

      const res = await request(app).delete(`/cars/${cars[0].id}`);

      expect(res.status).to.equal(204);
    });

    it('Deve retornar status 422 quando mongo id inválido', async function () {
      const res = await request(app).delete('/cars/3ab2');

      expect(res.status).to.deep.equal(422);
      expect(res.body).to.deep.property('message', invalidMongoId);
    });
  });
});
