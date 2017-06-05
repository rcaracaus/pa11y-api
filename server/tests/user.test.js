import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
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
    it('should return a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(testUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(testUser.email);
          expect(res.body.name).to.deep.equal(testUser.name);
          done();
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
          expect(res.body.email).to.equal(testUser.email);
          expect(res.body.name).to.deep.equal(testUser.name);
          done();
        })
        .catch(done);
    });

    it('should return Authentication error on fail', (done) => {
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

    it('should return session log in after first log in');
  });
});
