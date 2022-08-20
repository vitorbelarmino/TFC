import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  static async getAll(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();

    res.status(200).json(allTeams);
  }
}

export default TeamsController;
