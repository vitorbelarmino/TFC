import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const allMatches = await MatchesService.getAll();
      return res.status(200).json(allMatches);
    }
    const getProgress = await MatchesService.getInProgress(inProgress as string);
    return res.status(200).json(getProgress);
  }

  static async createMatch(req: Request, res: Response) {
    const match = req.body;
    const token = req.headers.authorization;
    const result = await MatchesService.createMatch(match, token as string);
    res.status(201).json(result);
  }

  static async finishMatches(req: Request, res: Response) {
    const { id } = req.params;
    const result = await MatchesService.finishMatches(Number(id));
    res.status(200).json(result);
  }

  static async UpdateScore(req: Request, res: Response) {
    const { id } = req.params;
    const score = req.body;
    const match = await MatchesService.updateScore(score, Number(id));
    res.status(200).json(match);
  }
}

export default MatchesController;
