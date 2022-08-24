import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Token from '../helpers/token'

import { app } from '../app';
import Matches from '../database/models/MatchesModels';
import { rankingInOrderMock, TeamsWithMatchesMock } from './mocks/Leaderboard';
import ITeamsWithMatches from '../entities/ITeamsWithMatches';
import Teams from '../database/models/TeamsModels';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testa LeaderboardCreated', () => {
  it('Cria o Ranking dos times', async() => {
    sinon.stub(Matches, 'findAll').resolves(TeamsWithMatchesMock as unknown as Teams[])
    const response = await chai.request(app).get('/leaderboard/home')
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(rankingInOrderMock)
  })
})