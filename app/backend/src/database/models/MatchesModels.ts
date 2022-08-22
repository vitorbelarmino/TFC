import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './TeamsModels';

class Matches extends Model {
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    homeTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    awayTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },

  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });

Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatches' });

Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatches' });

export default Matches;
