'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _issue = require('../models/issue.model');

var _issue2 = _interopRequireDefault(_issue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load issue and append to req.
 */
function load(req, res, next, id) {
  _issue2.default.get(id).then(function (issue) {
    req.issue = issue; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get issue
 * @returns {Issue}
 */
function get(req, res) {
  return res.json(req.issue);
}

/**
 * Create new issue
 * @property {string} req.body.code - The code of issue.
 * @property {string} req.body.context - The context of issue.
 * @property {string} req.body.message - The message of issue.
 * @property {string} req.body.selector - The selector of an issue.
 * @property {string} req.body.type - The type of an issue.
 * @property {number} req.body.typeCode - The typeCode of an issue.
 * @property {string} req.body.url - The parent url of an issue.
 * @returns {Issue}
 */
function create(req, res, next) {
  var issue = new _issue2.default({
    code: req.body.code,
    context: req.body.context,
    message: req.body.message,
    selector: req.body.selector,
    type: req.body.type,
    typeCode: req.body.typeCode,
    url: req.body.url
  });

  issue.save().then(function (savedIssue) {
    return res.json(savedIssue);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing issue
 * @property {string} req.body.code - The code of issue.
 * @property {string} req.body.context - The context of issue.
 * @property {string} req.body.message - The message of issue.
 * @property {string} req.body.selector - The selector of an issue.
 * @property {string} req.body.type - The type of an issue.
 * @property {number} req.body.typeCode - The typeCode of an issue.
 * @property {string} req.body.url - The parent url of an issue.
 * @returns {Issue}
 */
function update(req, res, next) {
  var issue = req.issue;
  issue.code = req.body.code;
  issue.context = req.body.context;
  issue.message = req.body.message;
  issue.selector = req.body.selector;
  issue.type = req.body.type;
  issue.typeCode = req.body.typeCode;
  issue.url = req.body.url;

  issue.save().then(function (savedIssue) {
    return res.json(savedIssue);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get issue list.
 * @property {number} req.query.skip - Number of issues to be skipped.
 * @property {number} req.query.limit - Limit number of issues to be returned.
 * @returns {Issue[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _issue2.default.list({ limit: limit, skip: skip }).then(function (issues) {
    return res.json(issues);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete issue.
 * @returns {Issue}
 */
function remove(req, res, next) {
  var issue = req.issue;
  issue.remove().then(function (deletedIssue) {
    return res.json(deletedIssue);
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
module.exports = exports['default'];
//# sourceMappingURL=issue.controller.js.map
