import ICar from '../../src/Interfaces/ICar';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';

const colorBike = 'Mineral Grey Metallic';

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

const motorcycle: IMotorcycle = {
  model: 'S 1000 RR',
  year: 2023,
  color: colorBike,
  status: true,
  buyValue: 150.999,
  category: 'Superbike',
  engineCapacity: 999,
};

const motorcycles: IMotorcycle[] = [
  {
    id: '63e2adb7135a458473a3274b',
    model: 'S 1000 RR',
    year: 2023,
    color: colorBike,
    status: true,
    buyValue: 150.999,
    category: 'Superbike',
    engineCapacity: 999,
  },
  {
    id: '63e2adb7135a458473a3274d',
    model: 'XJ6',
    year: 2023,
    color: 'Red',
    status: true,
    buyValue: 41.999,
    category: 'Street',
    engineCapacity: 600,
  },
];

const motorcycleWithoutStatus: IMotorcycle = {
  model: 'S 1000 RR',
  year: 2023,
  color: colorBike,
  buyValue: 150.999,
  category: 'Superbike',
  engineCapacity: 999,
};

const motorcycleWithoutStatusOut: IMotorcycle = {
  id: '63e2b814135a458473a3275x',
  model: 'S 1000 RR',
  year: 2023,
  color: colorBike,
  status: false,
  buyValue: 150.999,
  category: 'Superbike',
  engineCapacity: 999,
};

export {
  car,
  cars,
  carWithoutStatus,
  carWithoutStatusOut,
  motorcycle,
  motorcycles,
  motorcycleWithoutStatus,
  motorcycleWithoutStatusOut,
};
