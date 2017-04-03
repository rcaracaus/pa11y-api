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
  let url = {
    reportId: '58e12613cb62a43beb0569f9',
    url: 'http://www.google.com',
    codes: ['WCAG2AA.Principle1.Test.Code1', 'WCAG2AA.Principle1.Test.Code2'],
    nErrors: 154,
    nWarnings: 816,
    nNotices: 2342
  };

  describe('# POST /api/urls', () => {
    it('should create a new url', (done) => {
      request(app)
        .post('/api/urls')
        .send(url)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.reportId).to.equal(url.reportId);
          expect(res.body.url).to.equal(url.url);
          expect(res.body.codes).to.deep.equal(url.codes);
          expect(res.body.nErrors).to.equal(url.nErrors);
          expect(res.body.nWarnings).to.equal(url.nWarnings);
          expect(res.body.nNotices).to.equal(url.nNotices);
          url = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/urls', () => {
    it('should get a list of urls', (done) => {
      request(app)
        .get('/api/urls')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/urls/:urlId', () => {
    it('should get url details', (done) => {
      request(app)
        .get(`/api/urls/${url._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.reportId).to.equal(url.reportId);
          expect(res.body.url).to.equal(url.url);
          expect(res.body.codes).to.deep.equal(url.codes);
          expect(res.body.nErrors).to.equal(url.nErrors);
          expect(res.body.nWarnings).to.equal(url.nWarnings);
          expect(res.body.nNotices).to.equal(url.nNotices);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/urls/:urlId', () => {
    it('should delete a url', (done) => {
      request(app)
        .delete(`/api/urls/${url._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.reportId).to.equal(url.reportId);
          expect(res.body.url).to.equal(url.url);
          expect(res.body.codes).to.deep.equal(url.codes);
          expect(res.body.nErrors).to.equal(url.nErrors);
          expect(res.body.nWarnings).to.equal(url.nWarnings);
          expect(res.body.nNotices).to.equal(url.nNotices);
          done();
        })
        .catch(done);
    });
  });
});
