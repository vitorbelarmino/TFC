import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Token from '../helpers/token'

import { app } from '../app';

import Users from '../database/models/UserModels';
import BCrypt from '../helpers/BCrypt';

const { expect } = chai;

describe('Testa rota GET/login/validate', () => {
  
  describe('Testa sucesso', () => {
    const userMock = {
      "email": "admin@admin.com",
      "password": "secret_admin",
      "role": "admin"
    }
  
    afterEach(() => {
      sinon.restore()
    })
    
    it('retorna o role', async () => {
        sinon.stub(Users, 'findOne').resolves(userMock as Users)
        sinon.stub(Token, 'validateToken').resolves(userMock);

        const response = await chai.request(app).get('/login/validate')
        .set('authorization', 'token' );
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ role: userMock.role })
    })
  })

  describe('Testa falha', () => {
    it('Testa requisição sem token', async () => {
      const response = await chai.request(app).get('/login/validate')
      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message:'Token not found' })
    })
    
  })
})