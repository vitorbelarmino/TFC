import Teams from '../database/models/TeamsModels';
import Matches from '../database/models/MatchesModels';
import LeaderboardCreated from '../helpers/LeaderboardCreated';
import { typeMatches } from '../entities/ITeamsWithMatches';

class LeaderBoardService {
  static async getRanking() {
    const matches = await Teams.findAll({ include: [
      { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    ],
    });
    const leaderboards = LeaderboardCreated.created(matches as any, typeMatches.HOME);
    const order = LeaderboardCreated.order(leaderboards);
    return order;
  }

  static async getRankingAway() {
    const matches = await Teams.findAll({ include: [
      { model: Matches, as: 'awayMatches', where: { inProgress: false } },
    ],
    });
    const leaderboards = LeaderboardCreated.created(matches as any, typeMatches.AWAY);
    const order = LeaderboardCreated.order(leaderboards);
    return order;
  }
}

export default LeaderBoardService;
