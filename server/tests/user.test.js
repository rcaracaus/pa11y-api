import jwt from 'jsonwebtoken';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import config from '../../config/config';
import app from '../../index';

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

  describe('# POST /api/user', () => {
    it('should be able to create a user', (done) => {
      request(app)
        .post('/api/user')
        .send(testUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(decoded.email).to.equal(testUser.email);
            expect(res.body.email).to.equal(testUser.email);
            expect(res.body.name).to.deep.equal(testUser.name);
            done();
          });
        })
        .catch(done);
    });
  });

  describe('# POST /api/user/login', () => {
    it('should be able to log in', (done) => {
      request(app)
        .post('/api/user/login')
        .send(testUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(decoded.email).to.equal(testUser.email);
            expect(res.body.email).to.equal(testUser.email);
            expect(res.body.name).to.deep.equal(testUser.name);
            testUser.token = `Bearer ${res.body.token}`;
            done();
          });
        })
        .catch(done);
    });

    it('should return Unauthorized on failed log in', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: testUser.email,
          password: `wrong${testUser.password}wrong`
        })
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/user/authenticate', () => {
    it('should return Unauthorized on failed token authentication', (done) => {
      request(app)
        .get('/api/user/authenticate')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should return "token" authentication with user data when using token', (done) => {
      request(app)
        .get('/api/user/authenticate')
        .set('Authorization', testUser.token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(testUser.email);
          expect(res.body.name).to.deep.equal(testUser.name);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/user', () => {
    it('should delete user associated with token', (done) => {
      request(app)
        .delete('/api/user')
        .set('Authorization', testUser.token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('User deleted');
          done();
        })
        .catch(done);
    });
  });
});
