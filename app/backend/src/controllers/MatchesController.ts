import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const allMatches = await MatchesService.getAll();
      res.status(200).json(allMatches);
    }
    const getProgress = await MatchesService.getInProgress(inProgress as string);
    res.status(200).json(getProgress);
  }
}

export default MatchesController;
