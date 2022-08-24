import Teams from '../database/models/TeamsModels';
import Matches from '../database/models/MatchesModels';
import LeaderboardCreated from '../helpers/LeaderboardCreated';
// import ITeamsWithMatches from '../entities/ITeamsWithMatches';

class LeaderBoardService {
  static async getRanking() {
    const matches = await Teams.findAll({ include: [
      { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    ],
    });
    const leaderboards = LeaderboardCreated.created(matches as any);
    return leaderboards;
  }
}

export default LeaderBoardService;
