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

interface ITeamsWithMatchesFull {
  id: number,
  teamName: string,
  homeMatches: {
    id: number,
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
    inProgress: number
  }[],
  awayMatches: {
    id: number,
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
    inProgress: number
  }[],
}

export { ITeamsWithMatches, Matches, typeMatches, ITeamsWithMatchesFull };
