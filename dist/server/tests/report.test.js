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
  // required because https://github.com/Automattic/mongoose/reports/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## Report APIs', function () {
  var report = {
    urls: [{ url: 'http:://www.google.com' }, { url: 'http:://www.google.com' }],
    standard: 'WCAGAA'
  };

  describe('# POST /api/reports', function () {
    it('should create a new report', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/reports').send(report).expect(_httpStatus2.default.OK).then(function (res) {
        res.body.urls.forEach(function (url, index) {
          report.urls[index]._id = res.body.urls[index]._id;
        });
        (0, _chai.expect)(res.body.urls).to.deep.equal(report.urls);
        (0, _chai.expect)(res.body.standard).to.equal(report.standard);
        report = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/reports/:reportId', function () {
    it('should get report details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/reports/' + report._id).expect(_httpStatus2.default.OK).then(function (res) {
        res.body.urls.forEach(function (url, index) {
          report.urls[index]._id = res.body.urls[index]._id;
        });
        (0, _chai.expect)(res.body.urls).to.deep.equal(report.urls);
        (0, _chai.expect)(res.body.standard).to.equal(report.standard);
        done();
      }).catch(done);
    });

    it('should report error with message - Not found, when report does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/reports/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/reports/:reportId', function () {
    it('should update report details', function (done) {
      report.standard = 'KK';
      (0, _supertestAsPromised2.default)(_index2.default).put('/api/reports/' + report._id).send(report).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.standard).to.equal('KK');
        (0, _chai.expect)(res.body.urls).to.deep.equal(report.urls);
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/reports/', function () {
    it('should get all reports', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/reports').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/reports/', function () {
    it('should delete report', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/reports/' + report._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.standard).to.equal('KK');
        (0, _chai.expect)(res.body.urls).to.deep.equal(report.urls);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=report.test.js.map
