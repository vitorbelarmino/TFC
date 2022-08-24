import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModels';
import IMatchesMock from './mockInterfaces/IMaches';
import IMatch from '../entities/IMatch';
import Token from '../helpers/token';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa as rotas de matches', () => {
  
  const allMatchesMock = [
    {
      "id": 1,
      "homeTeam": 1,
      "homeTeamGoals": 1,
      "awayTeam": 2,
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
      "homeTeam": 3,
      "homeTeamGoals": 1,
      "awayTeam": 4,
      "awayTeamGoals": 4,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    },
    {
		"id": 3,
		"homeTeam": 1,
		"homeTeamGoals": 2,
		"awayTeam": 3,
		"awayTeamGoals": 0,
		"inProgress": true,
		"teamHome": {
			"teamName": "São Paulo"
		},
		"teamAway": {
			"teamName": "Internacional"
		}
	},
  ];

  const inProgressMatchesMock = [
    {
      "id": 3,
      "homeTeam": 1,
      "homeTeamGoals": 2,
      "awayTeam": 3,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
  ]

  const newMachMock = {
    "homeTeam": 1,
    "awayTeam": 3,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    'inProgress': true
  }

  const sameTeamsMock =     {
    "homeTeam": 1,
    "awayTeam": 1,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  const matchFailMock =     {
    "homeTeam": '',
    "awayTeam": 1,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }

  const scoreMock = {
  "homeTeamGoals": 50,
  "awayTeamGoals": 100
  }
  
  
  afterEach(() => {
    sinon.restore()
  })
  describe('Retorna partidas', () => {
    it('Retorna dados da partida', async () => {
      sinon.stub(Matches, 'findAll').resolves(allMatchesMock as any)
      
      const response = await chai.request(app).get('/matches').send()
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(allMatchesMock)
    })
    
    it('Retorna dados da todas as partidas em progresso', async () => {
      sinon.stub(Matches, 'findAll').resolves(inProgressMatchesMock as unknown as Matches[])
      const response = await chai.request(app).get('/matches?inProgress=true')
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(inProgressMatchesMock)
    })
  })
    
  describe('Alteração e criação no banco de dados', () => {
    describe('Criação de partida', () => {
      it('Testa a criação de uma partida com sucesso"', async() => {
        sinon.stub(Matches, "create").resolves(newMachMock as any)
        sinon.stub(Token, "validateToken").resolves()
        
        const response = await chai.request(app).post('/matches').send(newMachMock)
        expect(response.status).to.be.equal(201)
        expect(response.body).to.be.deep.equal(newMachMock)    
      })
      
      it('Testa se não é possível a criação de uma partida com times iguais', async () => {
        sinon.stub(Token, "validateToken").resolves()
        
        const response = await chai.request(app).post('/matches').send(sameTeamsMock)
        expect(response.status).to.be.equal(401)
        expect(response.body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'})
      })
      
      it('Testa se não é possível criar uma partida faltando um time', async() => {
        sinon.stub(Token, "validateToken").resolves()
        
        const response = await chai.request(app).post('/matches').send(matchFailMock)
        expect(response.status).to.be.equal(404)
        expect(response.body).to.be.deep.equal({message: 'There is no team with such id!'})
      })
    })
      
    describe('Alteração de placar', () => {
      it('Altera a propriedade inProgress pra false de partida no banco de dados', async() => {
        sinon.stub(Matches, 'update').resolves()

        const response = await chai.request(app).patch('/matches/1/finish').send()
        expect(response.status).to.be.equal(200)
        expect(response.body).to.be.deep.equal({message: 'Finished'})
      })

      it('Altera o placar de uma partida no banco de dados', async() => {
        sinon.stub(Matches, 'update').resolves()

        const response = await chai.request(app).patch('/matches/1/').send(scoreMock)
        expect(response.status).to.be.equal(200)
        expect(response.body).to.be.deep.equal({message: 'updated score with success'})
      })
    })
})
  
})
