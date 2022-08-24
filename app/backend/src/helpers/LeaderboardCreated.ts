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

  static created(matches: ITeamsWithMatches[]) {
    const ranking = matches.map((e: ITeamsWithMatches) => {
      const favorGoals = e.homeMatches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
      const ownGoals = e.homeMatches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
      const points = (this.victories(e) * 3) + this.draws(e);
      const allMatches = e.homeMatches.length;
      return {
        name: e.teamName,
        totalPoints: points,
        totalVictories: this.victories(e),
        totalDraws: this.draws(e),
        totalLosses: this.Losses(e),
        goalsFavor: favorGoals,
        goalsOwn: ownGoals,
        goalsBalance: favorGoals - ownGoals,
        efficiency: ((points / (allMatches * 3)) * 100).toFixed(2),
      };
    });
    return ranking;
  }
}
export default RankingDTO;
