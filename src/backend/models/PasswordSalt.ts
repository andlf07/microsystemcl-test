import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { UserModel } from './User';
import { ModelInitializer } from './interface';

export interface PasswordSaltAttributes {
  id?: any;
  password?: string;
  salt?: number;
  user_id?: any;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PasswordSaltCreationAttributes extends Optional<PasswordSaltAttributes, 'id'> {}

export class PasswordSaltModel extends Model<
  PasswordSaltAttributes,
  PasswordSaltCreationAttributes
> {
  public id!: any;
  public password!: string;
  public salt!: number;
  public user_id!: any;
  public enabled!: boolean;
  public readonly created_at!: string;
  public readonly updated_at!: string;
}

export class PasswordSaltModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    PasswordSaltModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        password: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'password cant be empty',
            },
          },
        },
        enabled: {
          type: new DataTypes.BOOLEAN(),
          allowNull: false,
          defaultValue: true,
          validate: {
            notEmpty: {
              msg: 'enabled cant be empty',
            },
          },
        },
        salt: {
          allowNull: true,
          type: new DataTypes.INTEGER(),
          validate: {
            notEmpty: {
              msg: 'salt cant be empty',
            },
          },
        },
      },
      {
        sequelize: this.client,
        modelName: 'PasswordSalt',
        tableName: 'passwords_salts',
        timestamps: true,
      }
    );
  }
  assosiations(): void {
    PasswordSaltModel.belongsTo(UserModel, {
      foreignKey: {
        name: 'user_id',
        allowNull: true,
      },
      as: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
