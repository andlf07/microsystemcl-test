import { PasswordSaltModelInitializer } from './PasswordSalt';
import { ResetPasswordCodeModelInitializer } from './ResetPasswordCode';
import { UserModelInitializer } from './User';

export interface ModelInitializer {
  initialize: () => void;
  assosiations?: () => void;
}

export interface InstanceModels {
  userModel: UserModelInitializer;
  passwordSaltModel: PasswordSaltModelInitializer;
  resetPasswordCode: ResetPasswordCodeModelInitializer;
}
