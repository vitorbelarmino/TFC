import Teams from '../database/models/TeamsModels';
import Matches from '../database/models/MatchesModels';
import LeaderboardCreateFiltered from '../helpers/LeaderboardCreateFiltered';
import {
  ITeamsWithMatches,
  ITeamsWithMatchesFull,
  typeMatches } from '../entities/ITeamsWithMatches';
import LeaderboardCreateFull from '../helpers/LeaderboardCreateFull';
import SortLeaderboards from '../helpers/SortLeaderboards';

class LeaderBoardService {
  static async getRankingHome() {
    const matches = await Teams.findAll({ include: [
      { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    ],
    });
    const leaderboards = LeaderboardCreateFiltered
      .created(matches as unknown as ITeamsWithMatches[], typeMatches.HOME);
    const sort = SortLeaderboards.sort(leaderboards);
    return sort;
  }

  static async getRankingAway() {
    const matches = await Teams.findAll({ include: [
      { model: Matches, as: 'awayMatches', where: { inProgress: false } },
    ],
    });
    const leaderboards = LeaderboardCreateFiltered
      .created(matches as unknown as ITeamsWithMatches[], typeMatches.AWAY);
    const sort = SortLeaderboards.sort(leaderboards);
    return sort;
  }

  static async getRankingFull() {
    const matches = await Teams.findAll({ include: [
      { model: Matches, as: 'homeMatches', where: { inProgress: false } },
      { model: Matches, as: 'awayMatches', where: { inProgress: false } },
    ],
    });
    const leaderboards = LeaderboardCreateFull
      .created(matches as unknown as ITeamsWithMatchesFull[]);
    const sort = SortLeaderboards.sort(leaderboards);
    return sort;
  }
}

export default LeaderBoardService;
