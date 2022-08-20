import Teams from '../database/models/TeamsModels';

class TeamsService {
  static async getAll() {
    const allTeams = await Teams.findAll();
    return allTeams;
  }

  static async getById(id: number) {
    const getTeam = await Teams.findOne({ where: { id } });
    return getTeam;
  }
}

export default TeamsService;
