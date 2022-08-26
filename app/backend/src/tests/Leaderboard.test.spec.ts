import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModels';
import { rankingAwayInOrderMock, rankingHomeInOrderMock,
  teamsAwayWithMatchesMock, TeamsHomeWithMatchesMock } from './mocks/Leaderboard';
import Teams from '../database/models/TeamsModels';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Leaderboards', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('Testa a rota GET"/Leaderboards/home"', () => {
    it('retorna o Ranking dos times que jogaram em casa', async() => {
      sinon.stub(Matches, 'findAll').resolves(TeamsHomeWithMatchesMock as unknown as Teams[])
      const response = await chai.request(app).get('/leaderboard/home')
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(rankingHomeInOrderMock)
    })
  })

  describe('Testa a rota GET"/leaderboard/away"', () => {
    it('retorna o Ranking dos times que jogaram fora de casa', async() => {
      sinon.stub(Matches, 'findAll').resolves(teamsAwayWithMatchesMock as unknown as Teams[])
      const response = await chai.request(app).get('/leaderboard/away')
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(rankingAwayInOrderMock)
    })
  })
})