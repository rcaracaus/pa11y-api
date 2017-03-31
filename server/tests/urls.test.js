import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Urls APIs', () => {
  describe('# GET /api/urls', () => {
    it('should get a list of urls', (done) => {
      request(app)
        .get('/api/urls')
        .query({ reportId: '58dd2c6038880c5fe44825b6' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.urls).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });
});
