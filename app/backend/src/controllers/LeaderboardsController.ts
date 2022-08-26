import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardsService';

class LeaderboardsController {
  static async getRankingHome(req: Request, res: Response) {
    const ranking = await LeaderBoardService.getRanking();
    res.status(200).json(ranking);
  }

  static async getRankingAway(req: Request, res: Response) {
    const ranking = await LeaderBoardService.getRankingAway();
    res.status(200).json(ranking);
  }
}

export default LeaderboardsController;
