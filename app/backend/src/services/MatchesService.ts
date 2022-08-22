import Teams from '../database/models/TeamsModels';
import Matches from '../database/models/MatchesModels';

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

  static async finishMatches(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}

export default MatchesService;
