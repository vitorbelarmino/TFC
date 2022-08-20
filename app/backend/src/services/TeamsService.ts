import Teams from '../database/models/TeamsModels';

class TeamsService {
  static async getAll() {
    const allTeams = await Teams.findAll();
    return allTeams;
  }
}

export default TeamsService;
