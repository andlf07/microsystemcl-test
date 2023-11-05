import { dbConnect, dbFinish } from './sqlClient';

export const openConnection = async (): Promise<void> => {
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
    throw new Error('Something was wrong on databases open connections process');
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    await dbFinish();
  } catch (error) {
    throw new Error('Something was wrong on databases close connections process');
  }
};
