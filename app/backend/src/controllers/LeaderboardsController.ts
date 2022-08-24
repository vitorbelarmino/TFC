import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardsService';

class LeaderboardsController {
  static async getRanking(req: Request, res: Response) {
    const ranking = await LeaderBoardService.getRanking();
    res.status(200).json(ranking);
  }
}

export default LeaderboardsController;
