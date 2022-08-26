import ILeaderboard from '../entities/ILeaderboard';

class SortLeaderboards {
  static sort(ranking: ILeaderboard[]) {
    const order = ranking.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return order;
  }
}

export default SortLeaderboards;
