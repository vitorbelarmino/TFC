import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModels';
import IMatchesMock from './mockInterfaces/IMaches';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota GET/matches', () => {
  const matchesMock = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    },
  ]

  it('Retorna dados da partida', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any)
    const response = await chai.request(app).get('/matches')
  })
})
