import { ITeamsWithMatchesFull } from '../entities/ITeamsWithMatches';

class LeaderboardCreateFull {
  static victories(match: ITeamsWithMatchesFull) {
    const { homeMatches, awayMatches } = match;
    const homeVictories = homeMatches.reduce((a, c) => {
      if (c.homeTeamGoals > c.awayTeamGoals) return a + 1;
      return a;
    }, 0);
    const awayVictories = awayMatches.reduce((a, c) => {
      if (c.homeTeamGoals < c.awayTeamGoals) return a + 1;
      return a;
    }, 0);
    return homeVictories + awayVictories;
  }

  static draws(match: ITeamsWithMatchesFull) {
    const { homeMatches, awayMatches } = match;
    const homeDraws = homeMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    const awayDraws = awayMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return homeDraws + awayDraws;
  }

  static losses(match: ITeamsWithMatchesFull) {
    const { homeMatches, awayMatches } = match;
    const homeLosses = homeMatches.reduce((a, c) => {
      if (c.homeTeamGoals < c.awayTeamGoals) return a + 1;
      return a;
    }, 0);
    const awayLosses = awayMatches.reduce((a, c) => {
      if (c.homeTeamGoals > c.awayTeamGoals) return a + 1;
      return a;
    }, 0);
    return homeLosses + awayLosses;
  }

  static favorGoals(match: ITeamsWithMatchesFull) {
    const { homeMatches, awayMatches } = match;
    const goalsFavor = homeMatches
      .reduce((a, c) => a + c.homeTeamGoals, 0) + awayMatches
      .reduce((a, c) => a + c.awayTeamGoals, 0);
    return goalsFavor;
  }

  static ownsGoals(match: ITeamsWithMatchesFull) {
    const { homeMatches, awayMatches } = match;
    const goalsOwn = homeMatches
      .reduce((a, c) => a + c.awayTeamGoals, 0) + awayMatches
      .reduce((a, c) => a + c.homeTeamGoals, 0);
    return goalsOwn;
  }

  static created(matches: ITeamsWithMatchesFull[]) {
    const ranking = matches.map((e) => {
      const points = (this.victories(e) * 3) + this.draws(e);
      const games = e.homeMatches.length + e.awayMatches.length;
      return {
        name: e.teamName,
        totalPoints: points,
        totalGames: games,
        totalVictories: this.victories(e),
        totalDraws: this.draws(e),
        totalLosses: this.losses(e),
        goalsFavor: this.favorGoals(e),
        goalsOwn: this.ownsGoals(e),
        goalsBalance: this.favorGoals(e) - this.ownsGoals(e),
        efficiency: ((points / (games * 3)) * 100).toFixed(2),
      };
    });
    return ranking;
  }
}

export default LeaderboardCreateFull;
