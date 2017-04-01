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

describe('## Issue APIs', () => {
  let issue = {
    code: 'test',
    context: '<title>WordPress.com: Create a free we...</title>',
    message: 'Check that the title element describes the document.',
    selector: 'html > head > title',
    type: 'notice',
    typeCode: '3',
    reportId: '58dd2c6038880c5fe44825b6',
    url: 'url'
  };
  let issue2;

  describe('# POST /api/issues', () => {
    it('should create a new issue', (done) => {
      request(app)
        .post('/api/issues')
        .send(issue)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal(issue.code);
          expect(res.body.context).to.equal(issue.context);
          expect(res.body.message).to.equal(issue.message);
          expect(res.body.selector).to.equal(issue.selector);
          expect(res.body.context).to.equal(issue.context);
          expect(res.body.type).to.equal(issue.type);
          expect(res.body.reportId).to.equal(issue.reportId);
          expect(res.body.url).to.equal(issue.url);
          issue = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/issues', () => {
    it('should get issue listing', (done) => {
      // newly installed versions may have a new DB
      // we need to post an issue first to see a list (more than one)
      issue2 = issue;
      request(app)
        .post('/api/issues')
        .send(issue2)
        .then((res) => {
          issue2 = res.body;
          request(app)
            .get('/api/issues')
            .expect(httpStatus.OK);
        })
        .catch(done);
      done();
    });

    it('should respect limit and query parameter', (done) => {
      request(app)
        .get('/api/issues')
        .query({ limit: 1, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(issue._id);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when issue does not exists', (done) => {
      request(app)
        .get('/api/issues/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/issues/:issueId', () => {
    it('should get issue details', (done) => {
      request(app)
        .get(`/api/issues/${issue._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal(issue.code);
          expect(res.body.context).to.equal(issue.context);
          expect(res.body.message).to.equal(issue.message);
          expect(res.body.selector).to.equal(issue.selector);
          expect(res.body.context).to.equal(issue.context);
          expect(res.body.type).to.equal(issue.type);
          expect(res.body.reportId).to.equal(issue.reportId);
          expect(res.body.url).to.equal(issue.url);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when issue does not exists', (done) => {
      request(app)
        .get('/api/issues/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/issues/:issueId', () => {
    it('should update issue details', (done) => {
      issue.code = 'KK';
      request(app)
        .put(`/api/issues/${issue._id}`)
        .send(issue)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal('KK');
          expect(res.body.context).to.equal(issue.context);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/issues/', () => {
    it('should get all issues', (done) => {
      request(app)
        .get('/api/issues')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/issues/', () => {
    it('should delete issue', (done) => {
      request(app)
        .delete(`/api/issues/${issue._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal('KK');
          expect(res.body.context).to.equal(issue.context);
          done();
        })
        // delete issue2
        .then(() => request(app)
          .delete(`/api/issues/${issue2._id}`)
          .expect(httpStatus.OK)
          .catch(done)
        );
    });
  });
});
