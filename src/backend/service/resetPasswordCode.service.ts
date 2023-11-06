import { closeConnection, openConnection } from '../database/dbManager';
import { IPagination } from '../interface/Pagination';
import { ResetPasswordCodeModel } from '../models/ResetPasswordCode';

export const getAllResetPasswordCodes = async (
  params: any,
  pagination: IPagination
): Promise<any> => {
  const offset = (pagination.page - 1) * pagination.pageSize;
  try {
    await openConnection();

    const { rows, count } = await ResetPasswordCodeModel.findAndCountAll({
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

export const createResetPasswordCode = async (data: any): Promise<ResetPasswordCodeModel> => {
  try {
    await openConnection();

    const create = await ResetPasswordCodeModel.create(data);

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

export const updateResetPasswordCode = async (
  userId: string,
  data: any
): Promise<ResetPasswordCodeModel> => {
  try {
    await openConnection();

    const update = await ResetPasswordCodeModel.update(
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

export const deleteResetPasswordCode = async (userId: string): Promise<any> => {
  try {
    await openConnection();

    const deleteOne = await ResetPasswordCodeModel.destroy({
      where: { id: userId },
    });

    await closeConnection();

    return deleteOne;
  } catch (error) {
    throw new Error(`Error on delete: ResetPasswordCodeModel`);
  }
};

export const getOneResetPasswordCode = async (
  userId: string
): Promise<ResetPasswordCodeModel | null> => {
  try {
    await openConnection();

    const getOne = await ResetPasswordCodeModel.findOne({
      where: { id: userId },
      include: { all: true },
    });

    await closeConnection();

    return getOne;
  } catch (error) {
    console.log(error);
    throw new Error(`Error on getOne: ResetPasswordCodeModel`);
  }
};

export const getResetPasswordCodeByCode = async (
  code: number
): Promise<ResetPasswordCodeModel | null> => {
  try {
    await openConnection();

    const getCodeByCode = await ResetPasswordCodeModel.findOne({
      where: { code },
      include: { all: true },
    });

    await closeConnection();

    return getCodeByCode;
  } catch (error: any) {
    throw new Error(`Error on getResetPasswordCodeByEmail: ${error}`);
  }
};
