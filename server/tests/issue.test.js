import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;


const issuesData = [
  {
    code: 'imageMissingAlt',
    context: '<img src="/asdf.jgp" />',
    message: 'Different code and reportId',
    selector: 'html > head > img',
    type: 'warning',
    typeCode: '3',
    reportId: 'c5fe44825b658dd2c6038880',
    url: 'url'
  },
  {
    code: 'inaccessibleTitle',
    context: '<title>The worst accessibility problem ever...</title>',
    message: 'Check that the title element describes the document.',
    selector: 'html > head > title',
    type: 'notice',
    typeCode: '3',
    reportId: '58dd2c6038880c5fe44825b6',
    url: 'url'
  },
  {
    code: 'imageMissingAlt',
    context: '<img src="/asdf.jgp" />',
    message: 'Check that the image has alt text.',
    selector: 'html > head > img',
    type: 'warning',
    typeCode: '3',
    reportId: '58dd2c6038880c5fe44825b6',
    url: 'url'
  }
];

let lastIssue = issuesData[issuesData.length - 1];

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Issue APIs', () => {
  describe('# POST /api/issues', () => {
    it('should have test data', (done) => {
      for (let i = 0; i < issuesData.length - 1; i++) {
        request(app)
          .post('/api/issues')
          .send(issuesData[i])
          .then((res) => {
            issuesData[i] = res.body;
          });
      }
      done();
    });
    it('should create a new issue', (done) => {
      request(app)
        .post('/api/issues')
        .send(lastIssue)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal(lastIssue.code);
          expect(res.body.context).to.equal(lastIssue.context);
          expect(res.body.message).to.equal(lastIssue.message);
          expect(res.body.selector).to.equal(lastIssue.selector);
          expect(res.body.context).to.equal(lastIssue.context);
          expect(res.body.type).to.equal(lastIssue.type);
          expect(res.body.reportId).to.equal(lastIssue.reportId);
          expect(res.body.url).to.equal(lastIssue.url);
          lastIssue = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/issues', () => {
    it('should get issue listing', (done) => {
      request(app)
        .get('/api/issues')
        .expect(httpStatus.OK)
        .catch(done);
      done();
    });

    it('should respect limit and skip parameters', (done) => {
      let secondIssueId;
      request(app)
        .get('/api/issues')
        .then((res) => {
          secondIssueId = res.body[1]._id;
          return request(app)
            .get('/api/issues')
            .query({ limit: 1, skip: 1 })
            .expect(httpStatus.OK);
        })
        .then((res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(secondIssueId);
          done();
        })
        .catch(done);
    });

    it('should respect code and reportId parameters', (done) => {
      request(app)
        .get('/api/issues')
        .query({ code: 'imageMissingAlt', reportId: 'c5fe44825b658dd2c6038880' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body[0].message).to.equal('Different code and reportId');
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
        .get(`/api/issues/${lastIssue._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal(lastIssue.code);
          expect(res.body.context).to.equal(lastIssue.context);
          expect(res.body.message).to.equal(lastIssue.message);
          expect(res.body.selector).to.equal(lastIssue.selector);
          expect(res.body.context).to.equal(lastIssue.context);
          expect(res.body.type).to.equal(lastIssue.type);
          expect(res.body.reportId).to.equal(lastIssue.reportId);
          expect(res.body.url).to.equal(lastIssue.url);
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
      lastIssue.code = 'KK';
      request(app)
        .put(`/api/issues/${lastIssue._id}`)
        .send(lastIssue)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal('KK');
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
      // Delete all test data.
      for (let i = 0; i < issuesData.length - 1; i++) {
        const issue = issuesData[i];
        request(app)
          .delete(`/api/issues/${issue._id}`);
      }
      // Test final deletion
      request(app)
        .delete(`/api/issues/${lastIssue._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal('KK');
          expect(res.body.context).to.equal(lastIssue.context);
          done();
        })
        .catch(done);
    });
  });
});
