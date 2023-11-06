import { Sequelize } from 'sequelize';
import { PasswordSaltModelInitializer } from './PasswordSalt';
import { ResetPasswordCodeModelInitializer } from './ResetPasswordCode';
import { UserModelInitializer } from './User';
import { InstanceModels } from './interface';

export const instanceModels = (client: Sequelize): InstanceModels => {
  const userModel = new UserModelInitializer(client);
  const passwordSaltModel = new PasswordSaltModelInitializer(client);
  const resetPasswordCode = new ResetPasswordCodeModelInitializer(client);

  return { userModel, passwordSaltModel, resetPasswordCode };
};

export const initModels = (instances: InstanceModels): void => {
  const { passwordSaltModel, userModel, resetPasswordCode } = instances;

  userModel.initialize();
  passwordSaltModel.initialize();
  resetPasswordCode.initialize();
};

export const modelAssosiations = (instances: InstanceModels): void => {
  const { passwordSaltModel, userModel } = instances;

  userModel.assosiations();
  passwordSaltModel.assosiations();
};
