import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;

  declare teamName: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Users;
