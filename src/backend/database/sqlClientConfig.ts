import { config } from '~/consts/config';
import { SQLConfig } from './interface';
import * as pg from 'pg';

export const SqlClientConfig: SQLConfig = {
  pool: {
    max: 10,
    min: 0,
    idle: 1000,
    evict: 25000,
  },
  dialectModule: pg,
  dialectOptions: {
    decimalNumbers: true,
    // ssl: true,
    ssl: config.MODE_ENV === 'development' ? false : true,
  },
  dialect: 'postgres',
  host: `${config.DB_DOMAIN}`,
  port: Number(config.DB_PORT),
  username: `${config.DB_USER}`,
  password: `${config.DB_PASSWORD}`,
  database: `${config.DB_NAME}`,
};
