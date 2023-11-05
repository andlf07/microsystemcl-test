import { closeConnection, openConnection } from '../database/dbManager';
import { IPagination } from '../interface/Pagination';
import { UserModel } from '../models/User';

export const getAllUsers = async (params: any, pagination: IPagination): Promise<any> => {
  const offset = (pagination.page - 1) * pagination.pageSize;
  try {
    await openConnection();

    const { rows, count } = await UserModel.findAndCountAll({
      where: params,
      limit: pagination.pageSize,
      offset,
    });

    await closeConnection();

    return {
      data: rows,
      count: count,
      totalPages: Math.ceil(count / pagination.pageSize),
    };
  } catch (error: any) {
    throw new Error(
      JSON.stringify({
        type: error.name,
        //   message: error.errors[0].message,
      })
    );
  }
};

export const createUser = async (data: any): Promise<UserModel> => {
  try {
    await openConnection();

    const create = await UserModel.create(data);

    await closeConnection();

    return create;
  } catch (error: any) {
    if (error.name === 'SequelizeForeignKeyConstraintError')
      throw new Error(
        JSON.stringify({
          type: error.name,
          message: error.parent.detail,
        })
      );

    throw new Error(
      JSON.stringify({
        type: error.name,
        message: error.errors[0].message,
      })
    );
  }
};

export const updateUser = async (userId: string, data: any): Promise<UserModel> => {
  try {
    await openConnection();

    const update = await UserModel.update(
      { ...data },
      {
        where: { id: userId },
        returning: true,
      }
    );

    await closeConnection();

    return update[1][0];
  } catch (error: any) {
    if (error.name === 'SequelizeForeignKeyConstraintError')
      throw new Error(
        JSON.stringify({
          type: error.name,
          message: error.parent.detail,
        })
      );

    throw new Error(
      JSON.stringify({
        type: error.name,
        message: error.errors[0].message,
      })
    );
  }
};

export const deleteUser = async (userId: string): Promise<any> => {
  try {
    await openConnection();

    const deleteOne = await UserModel.destroy({
      where: { id: userId },
    });

    await closeConnection();

    return deleteOne;
  } catch (error) {
    throw new Error(`Error on delete: UserModel`);
  }
};

export const getOneUser = async (userId: string): Promise<UserModel | null> => {
  try {
    await openConnection();

    const getOne = await UserModel.findOne({
      where: { id: userId },
      include: { all: true },
    });

    await closeConnection();

    return getOne;
  } catch (error) {
    console.log(error);
    throw new Error(`Error on getOne: UserModel`);
  }
};

export const getUserByEmail = async (email: string): Promise<UserModel | null> => {
  try {
    await openConnection();

    const getOneByeEmail = await UserModel.findOne({
      where: { email },
      include: { all: true },
    });

    await closeConnection();

    return getOneByeEmail;
  } catch (error: any) {
    throw new Error(`Error on getUserByEmail: ${error}`);
  }
};

export const findOrCreateUser = async (data: any): Promise<UserModel> => {
  try {
    await openConnection();

    const [user, isCreated] = await UserModel.findOrCreate({
      where: { email: data.email },
      defaults: { ...data },
    });

    await closeConnection();

    return user;
  } catch (error: any) {
    if (error.name === 'SequelizeForeignKeyConstraintError')
      throw new Error(
        JSON.stringify({
          type: error.name,
          message: error.parent.detail,
        })
      );

    throw new Error(
      JSON.stringify({
        type: error.name,
        message: error.errors[0].message,
      })
    );
  }
};
