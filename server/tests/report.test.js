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
  // required because https://github.com/Automattic/mongoose/reports/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Report APIs', () => {
  let report = {
    urls: ['http://www.google.com', 'http://www.google.com'],
    standard: 'WCAGAA',
  };

  describe('# POST /api/reports', () => {
    it('should create a new report', (done) => {
      request(app)
        .post('/api/reports')
        .send(report)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.urls).to.deep.equal(report.urls);
          expect(res.body.standard).to.equal(report.standard);
          report = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/reports/:reportId', () => {
    it('should get report details', (done) => {
      request(app)
        .get(`/api/reports/${report._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.urls).to.deep.equal(report.urls);
          expect(res.body.standard).to.equal(report.standard);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when report does not exists', (done) => {
      request(app)
        .get('/api/reports/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/reports/:reportId', () => {
    it('should update report details', (done) => {
      report.standard = 'KK';
      request(app)
        .put(`/api/reports/${report._id}`)
        .send(report)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.standard).to.equal('KK');
          expect(res.body.urls).to.deep.equal(report.urls);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/reports/', () => {
    it('should get all reports', (done) => {
      request(app)
        .get('/api/reports')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/reports/', () => {
    it('should delete report', (done) => {
      request(app)
        .delete(`/api/reports/${report._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.standard).to.equal('KK');
          expect(res.body.urls).to.deep.equal(report.urls);
          done();
        })
        .catch(done);
    });
  });
});
