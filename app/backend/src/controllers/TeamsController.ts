import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  static async getAll(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();

    res.status(200).json(allTeams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const getTeam = await TeamsService.getById(Number(id));
    res.status(200).json(getTeam);
  }
}

export default TeamsController;
