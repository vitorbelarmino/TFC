interface ITeamsWithMatches {
  id: number,
  teamName: string,
  homeMatches: [
    {
      id: number,
      homeTeam: number,
      homeTeamGoals: number,
      awayTeam: number,
      awayTeamGoals: number,
      inProgress: number
    },
  ]
}

export default ITeamsWithMatches;
