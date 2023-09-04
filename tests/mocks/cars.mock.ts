import ICar from '../../src/Interfaces/ICar';

const car: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.999,
  doorsQty: 4,
  seatsQty: 5,
};

const cars: ICar[] = [
  {
    id: '63e2aae4135a458473a32730',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.999,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '63e2aae4135a458473a32732',
    model: 'Up!',
    year: 2020,
    color: 'White',
    status: true,
    buyValue: 40.999,
    doorsQty: 4,
    seatsQty: 5,
  },
];

const carUpdate: ICar = {
  model: 'Uno',
  year: 2002,
  color: 'Red',
  status: true,
  buyValue: 3500,
  doorsQty: 2,
  seatsQty: 5,
};

const carWithoutStatus: ICar = {
  model: 'Up!',
  year: 2020,
  color: 'White',
  buyValue: 40.999,
  doorsQty: 4,
  seatsQty: 5,
};

const carWithoutStatusOut: ICar = {
  id: '63e2b814135a458473a3275e',
  model: 'Up!',
  year: 2020,
  color: 'White',
  status: false,
  buyValue: 40.998,
  doorsQty: 4,
  seatsQty: 5,
};

export { car, cars, carWithoutStatus, carWithoutStatusOut, carUpdate };
