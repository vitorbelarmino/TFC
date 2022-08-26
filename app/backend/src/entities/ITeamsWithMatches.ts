enum typeMatches {
  HOME = 'homeMatches',
  AWAY = 'awayMatches',
}

type Matches = {
  [key in typeMatches]:
  {
    id: number,
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
    inProgress: number
  }[];

};
interface ITeamsWithMatches extends Matches {
  id: number,
  teamName: string,
}

export { ITeamsWithMatches, Matches, typeMatches };
