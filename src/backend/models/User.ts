import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { PasswordSaltModel } from './PasswordSalt';
import { ModelInitializer } from './interface';

export interface UserAttributes {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  authProvider?: string;
  password?: any;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public authProvider!: string;
  public password!: any;
  public enabled!: boolean;
  public readonly created_at!: string;
  public readonly updated_at!: string;
}

export class UserModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    UserModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        first_name: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'first_name cant be empty',
            },
          },
        },
        last_name: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'last_name cant be empty',
            },
          },
        },
        authProvider: {
          allowNull: true,
          type: new DataTypes.ENUM('GOOGLE'),
        },
        email: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          unique: true,
          validate: {
            notEmpty: {
              msg: 'email cant be empty',
            },
            isEmail: {
              msg: 'email has to be a valid email',
            },
          },
        },
        enabled: {
          type: new DataTypes.BOOLEAN(),
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize: this.client,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }
  assosiations(): void {
    UserModel.hasOne(PasswordSaltModel, {
      foreignKey: {
        name: 'user_id',
        allowNull: true,
      },
      as: 'password',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
