import Teams from '../database/models/TeamsModels';
import Matches from '../database/models/MatchesModels';
import IMatch from '../entities/IMatch';
import Token from '../helpers/token';
import CustomError from '../helpers/CustomError';
import TeamsService from './TeamsService';

class MatchesService {
  static async getAll() {
    const allMatches = await Matches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return allMatches;
  }

  static async getInProgress(query: string) {
    const inProgress = query === 'true';
    const getInProgress = await Matches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress } });
    return getInProgress;
  }

  static async createMatch(match: IMatch, token: string) {
    await Token.validateToken(token);
    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    const homeTeam = await TeamsService.getById(Number(match.homeTeam));
    const awayTeam = await TeamsService.getById(Number(match.awayTeam));
    console.log(homeTeam, awayTeam);
    if (!homeTeam || !awayTeam) throw new CustomError(404, 'There is no team with such id!');

    const newMatch = await Matches.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async finishMatches(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}

export default MatchesService;
