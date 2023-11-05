import { closeConnection, openConnection } from '../database/dbManager';
import { IPagination } from '../interface/Pagination';
import { PasswordSaltModel } from '../models/PasswordSalt';

export const getPasswordSalt = async (params: any, pagination: IPagination): Promise<any> => {
  const offset = (pagination.page - 1) * pagination.pageSize;
  try {
    await openConnection();

    const { rows, count } = await PasswordSaltModel.findAndCountAll({
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

export const createPasswordSalt = async (data: any): Promise<PasswordSaltModel> => {
  try {
    await openConnection();

    const create = await PasswordSaltModel.create(data);

    await closeConnection();

    return create;
  } catch (error: any) {
    console.log(error);
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

export const updatePasswordSalt = async (
  passwordSaltId: string,
  data: any
): Promise<PasswordSaltModel> => {
  try {
    await openConnection();

    const update = await PasswordSaltModel.update(
      { ...data },
      {
        where: { id: passwordSaltId },
        returning: true,
      }
    );

    await closeConnection();

    return update[1][0];
  } catch (error: any) {
    console.log(error, 'test');
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

export const deletePasswordSalt = async (passwordSaltId: string): Promise<any> => {
  try {
    await openConnection();

    const deleteOne = await PasswordSaltModel.destroy({
      where: { id: passwordSaltId },
    });

    await closeConnection();

    return deleteOne;
  } catch (error) {
    throw new Error(`Error on delete: UserModel`);
  }
};
