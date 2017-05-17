import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import app from '../../index';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## User APIs', () => {
  const testUser = {
    email: 'johndoe@farmabro.com',
    name: {
      first: 'John',
      last: 'Doe'
    },
    password: 'hello$!/world'
  };
  let jwtToken;

  describe('# POST /api/user', () => {
    it('should return a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(testUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(testUser.email);
          expect(res.body.name).to.deep.equal(testUser.name);
          testUser._id = res.body._id;
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/user/login', () => {
    it('should return Authentication error', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: testUser.email,
          password: `wrong${testUser.password}wrong`
        })
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Authentication error');
          done();
        })
        .catch(done);
    });

    it('should get valid JWT token', (done) => {
      request(app)
        .post('/api/user/login')
        .send(testUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
            expect(decoded.email).to.equal(testUser.email);
            jwtToken = `Bearer ${res.body.token}`;
            done();
          });
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/user/:userId', () => {
    it('should delete the test user', (done) => {
      request(app)
        .delete(`/api/user/${testUser._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(testUser.email);
          expect(res.body.name).to.deep.equal(testUser.name);
          // TODO: expect
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/user/random-number', () => {
    it('should fail to get random number because of missing Authorization', (done) => {
      request(app)
        .get('/api/user/random-number')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should fail to get random number because of wrong token', (done) => {
      request(app)
        .get('/api/user/random-number')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should get a random number', (done) => {
      request(app)
        .get('/api/user/random-number')
        .set('Authorization', jwtToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.num).to.be.a('number');
          done();
        })
        .catch(done);
    });
  });
});