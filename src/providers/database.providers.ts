import * as dotenv from 'dotenv';
import { dataSource } from 'src/database/dataSources/dataSource';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource;
    },
  },
];
