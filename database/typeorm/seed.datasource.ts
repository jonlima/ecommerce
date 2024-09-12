import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { dataSourceOptions } from './typeorm.datasource';
import { User1725995924835 } from './seeds/1725995924835-user';

const options: DataSourceOptions & SeederOptions = {
  ...dataSourceOptions,
  seeds: [User1725995924835],
  seedTracking: true,
};

export const dataSource = new DataSource(options);
