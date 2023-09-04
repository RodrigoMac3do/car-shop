import IMotorcycle from '../../src/Interfaces/IMotorcycle';

const colorBike = 'Mineral Grey Metallic';

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

const motorcycleUpdate = {
  model: 'Honda CG Titan 160',
  year: 2020,
  color: 'Black',
  status: true,
  buyValue: 8.2,
  category: 'Street',
  engineCapacity: 160,
};

export {
  motorcycle,
  motorcycles,
  motorcycleWithoutStatus,
  motorcycleWithoutStatusOut,
  motorcycleUpdate,
};
