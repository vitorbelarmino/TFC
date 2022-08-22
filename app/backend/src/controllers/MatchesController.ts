import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  static async getAll(req: Request, res: Response) {
    const allMatches = await MatchesService.getAll();
    res.status(200).json(allMatches);
  }
}

export default MatchesController;
