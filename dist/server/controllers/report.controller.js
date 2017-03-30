'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _report = require('../models/report.model');

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load report and append to req.
 */
function load(req, res, next, id) {
  _report2.default.get(id).then(function (report) {
    req.report = report; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get Reort
 * @returns {Report}
 */
function get(req, res) {
  return res.json(req.report);
}

/**
 * Create new report
 * @property {array} req.body.urls - The array of urls the report uses.
 * @property {string} req.body.standard - The standard the report uses.
 * @returns {Report}
 */
function create(req, res, next) {
  var report = new _report2.default({
    urls: req.body.urls,
    standard: req.body.standard
  });

  report.save().then(function (savedReport) {
    return res.json(savedReport);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing report
 * @property {array} req.body.urls - The array of urls the report uses.
 * @property {string} req.body.standard - The standard the report uses.
 * @returns {Report}
 */
function update(req, res, next) {
  var report = req.report;
  report.urls = req.body.urls;
  report.standard = req.body.standard;

  report.save().then(function (savedReport) {
    return res.json(savedReport);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get report list.
 * @property {number} req.query.skip - Number of reports to be skipped.
 * @property {number} req.query.limit - Limit number of reports to be returned.
 * @returns {Report[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _report2.default.list({ limit: limit, skip: skip }).then(function (reports) {
    return res.json(reports);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete report.
 * @returns {Report}
 */
function remove(req, res, next) {
  var report = req.report;
  report.remove().then(function (deletedReport) {
    return res.json(deletedReport);
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
module.exports = exports['default'];
//# sourceMappingURL=report.controller.js.map
