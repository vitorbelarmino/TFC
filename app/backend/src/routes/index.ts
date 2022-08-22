import { Router } from 'express';
import LoginValidate from '../middleware/LoginValidate';
import LoginController from '../controllers/LoginController';
import TeamsController from '../controllers/TeamsController';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.post('/login', LoginValidate.validate, LoginController.login)
  .get('/login/validate', LoginController.validate)
  .get('/teams', TeamsController.getAll)
  .get('/teams/:id', TeamsController.getById)
  .get('/matches', MatchesController.getMatches);
// .patch('/matches', MatchesController.getInProgress);

export default router;
