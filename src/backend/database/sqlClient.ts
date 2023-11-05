import { Sequelize } from 'sequelize';
import { initModels, instanceModels, modelAssosiations } from '../models';
import { SqlClientConfig } from './sqlClientConfig';

// export const initSqlClient = new Sequelize(SqlClientConfig);

export const dbConnect = async (): Promise<Sequelize> => {
  const initSqlClient = new Sequelize(SqlClientConfig);

  try {
    const models = instanceModels(initSqlClient);
    initModels(models);
    modelAssosiations(models);

    await initSqlClient.authenticate().then(() => console.log('DB connection Open'));
    // if (process.env.NODE_ENV === 'development') return initSqlClient.sync({ alter: true });
    // else return initSqlClient;
    return initSqlClient;
  } catch (error) {
    console.log(error);
    throw new Error('Error in the SQL DB setup');
  }
};

export const dbFinish = async (): Promise<void> => {
  const initSqlClient = new Sequelize(SqlClientConfig);

  try {
    await initSqlClient.close().then(() => console.log('SQL connection closed'));
  } catch (error) {
    throw new Error('An error happend when connection was closing it');
  }
};
