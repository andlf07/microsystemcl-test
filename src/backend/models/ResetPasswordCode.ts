import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { ModelInitializer } from './interface';

export interface ResetPasswordCodeAttributes {
  id?: number;
  code?: number;
  email?: string;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ResetPasswordCodeCreationAttributes
  extends Optional<ResetPasswordCodeAttributes, 'id'> {}

export class ResetPasswordCodeModel extends Model<
  ResetPasswordCodeAttributes,
  ResetPasswordCodeCreationAttributes
> {
  public id!: number;
  public code!: number;
  public email!: string;
  public enabled!: boolean;
  public readonly created_at!: string;
  public readonly updated_at!: string;
}

export class ResetPasswordCodeModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    ResetPasswordCodeModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        code: {
          allowNull: false,
          unique: true,
          type: new DataTypes.INTEGER(),
          validate: {
            notEmpty: {
              msg: 'code cant be empty',
            },
          },
        },
        email: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'email cant be empty',
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
      },
      {
        sequelize: this.client,
        modelName: 'ResetPasswordCode',
        tableName: 'reset_password_codes',
        timestamps: true,
      }
    );
  }
}
