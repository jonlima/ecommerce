import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { dataSourceOptions } from './typeorm.datasource';

const options: DataSourceOptions & SeederOptions = {
  ...dataSourceOptions,
  seeds: [__dirname + '/seeds/*{.ts,.js}'],
  seedTracking: true,
};

const dataSource = new DataSource(options);

export default dataSource;
