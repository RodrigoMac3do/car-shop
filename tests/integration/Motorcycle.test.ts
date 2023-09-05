import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import request = require('supertest');
import app from '../../src/app';
import {
  motorcycle,
  motorcycleUpdate,
  motorcycles,
} from '../mocks/motorcycle.mock';

describe('Motorcycle', function () {
  const invalidMongoId = 'Invalid mongo id';

  beforeEach(function () {
    sinon.restore();
  });

  describe('GET /motorcycles', function () {
    it('Deve retornar todas as motos', async function () {
      sinon.stub(mongoose.Model, 'find').resolves(motorcycles);

      const res = await request(app).get('/motorcycles');

      expect(res.body).to.deep.equal(motorcycles);
      expect(res.body).to.be.an('array');
    });

    it('Deve retornar uma moto', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(motorcycles[0]);

      const res = await request(app).get(`/motorcycles/${motorcycles[0].id}`);

      expect(res.body.id).to.deep.equal(motorcycles[0].id);
      expect(res.body.id).to.not.deep.equal(motorcycles[1].id);
    });

    it('Deve retornar status 404 quando não encontrar uma moto', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(null);

      const res = await request(app).get(`/motorcycles/${motorcycles[0].id}`);

      expect(res.status).to.deep.equal(404);
      expect(res.body).to.have.property('message');
    });

    it('Deve retornar status 422 quando mongo id for inválido', async function () {
      sinon.stub(mongoose, 'isValidObjectId').callsFake(() => false);

      const res = await request(app).get('/motorcycles/1');

      expect(res.status).to.equal(422);
      expect(res.body).to.have.property('message', invalidMongoId);
    });
  });

  describe('POST /motorcycles', function () {
    it('Deve criar uma moto', async function () {
      sinon.stub(mongoose.Model, 'create').resolves(motorcycle);

      const res = await request(app).post('/motorcycles').send(motorcycle);

      expect(res.status).to.deep.equal(201);
      expect(res.body).to.deep.equal(motorcycle);
    });
  });

  describe('PUT /motorcycles/:id', function () {
    it('Deve atualizar uma moto', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(motorcycles[0]);
      sinon
        .stub(mongoose.Model, 'findByIdAndUpdate')
        .resolves(motorcycleUpdate);

      const res = await request(app)
        .put(`/motorcycles/${motorcycles[0].id}`)
        .send(motorcycleUpdate);

      expect(res.status).to.deep.equal(200);
      expect(res.body).to.deep.equal({
        id: motorcycles[0].id,
        ...motorcycleUpdate,
      });
    });

    it('Deve retornar 404 quando a moto não for encontrada', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(null);
      sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(null);

      const res = await request(app)
        .put(`/motorcycles/${motorcycles[0].id}`)
        .send(motorcycle);

      expect(res.status).to.deep.equal(404);
      expect(res.body).to.deep.property('message', 'Motorcycle not found');
    });

    it('Deve retornar status 422 quando mongo id inválido', async function () {
      const res = await request(app).put('/motorcycles/3ab2');

      expect(res.status).to.deep.equal(422);
      expect(res.body).to.deep.property('message', invalidMongoId);
    });
  });

  describe('DELETE /motorcycles/:id', function () {
    it('Deve retornar 404 quando a moto não for encontrada', async function () {
      sinon.stub(mongoose.Model, 'findById').resolves(motorcycles[0]);
      sinon.stub(mongoose.Model, 'findByIdAndRemove').resolves(null);

      const res = await request(app).delete(
        `/motorcycles/${motorcycles[0].id}`,
      );

      expect(res.status).to.equal(204);
    });

    it('Deve retornar status 422 quando mongo id inválido', async function () {
      const res = await request(app).delete('/motorcycles/3ab2');

      expect(res.status).to.deep.equal(422);
      expect(res.body).to.deep.property('message', invalidMongoId);
    });
  });
});
