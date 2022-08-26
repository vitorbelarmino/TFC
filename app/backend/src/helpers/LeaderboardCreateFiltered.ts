import { ITeamsWithMatches, typeMatches } from '../entities/ITeamsWithMatches';

class RankingDTO {
  static victories(match: ITeamsWithMatches, type: typeMatches) {
    const allVictories = match[type].reduce((acc, cur) => {
      if (type === 'homeMatches' && cur.homeTeamGoals > cur.awayTeamGoals) return acc + 1;
      if (type === 'awayMatches' && cur.homeTeamGoals < cur.awayTeamGoals) return acc + 1;

      return acc;
    }, 0);
    return allVictories;
  }

  static Losses(match: ITeamsWithMatches, type: typeMatches) {
    const allLosses = match[type].reduce((acc, cur) => {
      if (type === 'homeMatches' && cur.homeTeamGoals < cur.awayTeamGoals) return acc + 1;
      if (type === 'awayMatches' && cur.homeTeamGoals > cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return allLosses;
  }

  static draws(match: ITeamsWithMatches, type: typeMatches) {
    const allDraws = match[type].reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return allDraws;
  }

  static favorGoals(match: ITeamsWithMatches, type: typeMatches) {
    const goals = match[type].reduce((acc, cur) => {
      if (type === 'homeMatches') return acc + cur.homeTeamGoals;
      if (type === 'awayMatches') return acc + cur.awayTeamGoals;
      return acc;
    }, 0);
    return goals;
  }

  static ownGoals(match: ITeamsWithMatches, type: typeMatches) {
    const goals = match[type].reduce((acc, cur) => {
      if (type === 'homeMatches') return acc + cur.awayTeamGoals;
      if (type === 'awayMatches') return acc + cur.homeTeamGoals;
      return acc;
    }, 0);
    return goals;
  }

  static created(matches: ITeamsWithMatches[], type: typeMatches) {
    const ranking = matches.map((e) => {
      const points = (this.victories(e, type) * 3) + this.draws(e, type);
      return {
        name: e.teamName,
        totalPoints: points,
        totalGames: e[type].length,
        totalVictories: this.victories(e, type),
        totalDraws: this.draws(e, type),
        totalLosses: this.Losses(e, type),
        goalsFavor: this.favorGoals(e, type),
        goalsOwn: this.ownGoals(e, type),
        goalsBalance: this.favorGoals(e, type) - this.ownGoals(e, type),
        efficiency: ((points / (e[type].length * 3)) * 100).toFixed(2),
      };
    });
    return ranking;
  }
}
export default RankingDTO;
