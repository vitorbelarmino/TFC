import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota GET/teams', () => {
  const allTeamsMock = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ]
  afterEach(() => {
    sinon.restore()
  })
  it('Retorna todos os times', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsMock as Teams[])
    const response = await chai.request(app).get('/teams').send()

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeamsMock)
  })
  it('Retorna o time pelo "id"', async() => {
    sinon.stub(Teams, 'findOne').resolves(allTeamsMock[0] as Teams)
    
    const response = await chai.request(app).get('/teams/:id').send(allTeamsMock[0])
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeamsMock[0])
  })
})