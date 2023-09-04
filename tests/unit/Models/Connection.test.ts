import { expect } from 'chai';
// import mongoose from 'mongoose';
import connectToDatabase from '../../../src/Models/Connection';
// import 'dotenv/config';

describe('Conexão com DB', function () {
  // before(async function () {
  //   if (mongoose.connection.readyState !== 0) {
  //     await mongoose.connection.close();
  //   }
  //   await mongoose.connect('mongodb://car_shop_db:27017/CarShop');
  // });

  // after(async function () {
  //   await mongoose.connection.close();
  // });

  it('deve conectar ao MongoDB com a URL personalizada', async function () {
    const MONGO_DB_URL = 'mongodb://car_shop_db:27017/CarShop';
    const result = await connectToDatabase(MONGO_DB_URL);

    expect(result.connection.readyState).to.equal(1);
  });
  // it('deve conectar ao MongoDB usando a variável de ambiente MONGO_DB_URL', async function () {
  //   const result = await connectToDatabase(process.env.MONGO_DB_URL);

  //   expect(result.connection.readyState).to.equal(1);

  //   delete process.env.MONGO_DB_URL;
  // });
});
