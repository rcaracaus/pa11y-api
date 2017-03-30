'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

/**
 * root level hooks
 */
after(function (done) {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## Issue APIs', function () {
  var issue = {
    code: 'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2',
    context: '<title>WordPress.com: Create a free we...</title>',
    message: 'Check that the title element describes the document.',
    selector: 'html > head > title',
    type: 'notice',
    typeCode: '3',
    url: 'url'
  };

  describe('# POST /api/issues', function () {
    it('should create a new issue', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/issues').send(issue).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.code).to.equal(issue.code);
        (0, _chai.expect)(res.body.context).to.equal(issue.context);
        (0, _chai.expect)(res.body.message).to.equal(issue.message);
        (0, _chai.expect)(res.body.selector).to.equal(issue.selector);
        (0, _chai.expect)(res.body.context).to.equal(issue.context);
        (0, _chai.expect)(res.body.type).to.equal(issue.type);
        (0, _chai.expect)(res.body.url).to.equal(issue.url);
        issue = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/issues/:issueId', function () {
    it('should get issue details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/issues/' + issue._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.code).to.equal(issue.code);
        (0, _chai.expect)(res.body.context).to.equal(issue.context);
        (0, _chai.expect)(res.body.message).to.equal(issue.message);
        (0, _chai.expect)(res.body.selector).to.equal(issue.selector);
        (0, _chai.expect)(res.body.context).to.equal(issue.context);
        (0, _chai.expect)(res.body.type).to.equal(issue.type);
        (0, _chai.expect)(res.body.url).to.equal(issue.url);
        done();
      }).catch(done);
    });

    it('should report error with message - Not found, when issue does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/issues/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/issues/:issueId', function () {
    it('should update issue details', function (done) {
      issue.code = 'KK';
      (0, _supertestAsPromised2.default)(_index2.default).put('/api/issues/' + issue._id).send(issue).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.code).to.equal('KK');
        (0, _chai.expect)(res.body.context).to.equal(issue.context);
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/issues/', function () {
    it('should get all issues', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/issues').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/issues/', function () {
    it('should delete issue', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/issues/' + issue._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.code).to.equal('KK');
        (0, _chai.expect)(res.body.context).to.equal(issue.context);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=issue.test.js.map
