import { Sequelize } from 'sequelize';
import { UserModelInitializer } from './User';
import { PasswordSaltModelInitializer } from './PasswordSalt';
import { InstanceModels } from './interface';
import { ResetPasswordCodeModelInitializer } from './ResetPasswordCode';

export const instanceModels = (client: Sequelize): InstanceModels => {
  const userModel = new UserModelInitializer(client);
  const passwordSaltModel = new PasswordSaltModelInitializer(client);
  const resetPasswordCode = new ResetPasswordCodeModelInitializer(client);

  return { userModel, passwordSaltModel, resetPasswordCode };
};

export const initModels = (instances: InstanceModels): void => {
  const { passwordSaltModel, userModel } = instances;

  userModel.initialize();
  passwordSaltModel.initialize();
};

export const modelAssosiations = (instances: InstanceModels): void => {
  const { passwordSaltModel, userModel } = instances;

  userModel.assosiations();
  passwordSaltModel.assosiations();
};
