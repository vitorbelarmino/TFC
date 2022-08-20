import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Token from '../helpers/token'

import { app } from '../app';

import Users from '../database/models/UserModels';
import BCrypt from '../helpers/BCrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota POST/login', () => {
describe('Testa login', () => {
  const LoginMock = {
    email: "admin@admin.com",
    password: "secret_admin"
  }
  const LoginMockFail = {
    email: "fake@fake.com",
    password: "secret_admin"
  }
  afterEach(() => {
    sinon.restore()
  })

  it('Espera retornar token', async () => {
    sinon.stub(Users, 'findOne').resolves(LoginMock as Users)
    sinon.stub(Token, 'createToken').resolves('generate')
    sinon.stub(BCrypt, 'VerifyPassword').callsFake(() => true)

    const response = await chai.request(app).post('/login').send(LoginMock)
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({token:'generate'})
    
  });

  it('Testa Login invalidado', async () => {
    sinon.stub(Users, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send(LoginMockFail)
    
    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({message:'Incorrect email or password'})
    
  });

  it('Testa erro caso a rota não tenha "email" ou "password"', async() => {
    
    const response = await chai.request(app).post('/login').send()
    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({message: 'All fields must be filled'})
  })
  

    })

});
