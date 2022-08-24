import ILeaderboard from '../entities/ILeaderboard';
import ITeamsWithMatches from '../entities/ITeamsWithMatches';
// import ILeaderboard from '../entities/ILeaderboard';

class RankingDTO {
  static victories(matches: ITeamsWithMatches) {
    const allVictories = matches.homeMatches.reduce((acc: number, cur: any) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return allVictories;
  }

  static Losses(matches: ITeamsWithMatches) {
    const allLosses = matches.homeMatches.reduce((acc: number, cur: any) => {
      if (cur.homeTeamGoals < cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return allLosses;
  }

  static draws(e: ITeamsWithMatches) {
    const allDraws = e.homeMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return allDraws;
  }

  static order(ranking: ILeaderboard[]) {
    const order = ranking.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return order;
  }

  static created(matches: ITeamsWithMatches[]) {
    const ranking = matches.map((e: ITeamsWithMatches) => {
      const favorGoals = e.homeMatches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
      const ownGoals = e.homeMatches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
      const points = (this.victories(e) * 3) + this.draws(e);
      return {
        name: e.teamName,
        totalPoints: points,
        totalGames: e.homeMatches.length,
        totalVictories: this.victories(e),
        totalDraws: this.draws(e),
        totalLosses: this.Losses(e),
        goalsFavor: favorGoals,
        goalsOwn: ownGoals,
        goalsBalance: favorGoals - ownGoals,
        efficiency: ((points / (e.homeMatches.length * 3)) * 100).toFixed(2),
      };
    });
    return ranking;
  }
}
export default RankingDTO;
