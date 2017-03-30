'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Issue Schema
 */
var IssueSchema = new _mongoose2.default.Schema({
  code: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  selector: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  typeCode: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
IssueSchema.method({});

/**
 * Statics
 */
IssueSchema.statics = {
  /**
   * Get Issue
   * @param {ObjectId} id - The objectId of issue.
   * @returns {Promise<Issue, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (issue) {
      if (issue) {
        return issue;
      }
      var err = new _APIError2.default('No such issue exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List issues in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of issues to be skipped.
   * @param {number} limit - Limit number of issues to be returned.
   * @returns {Promise<Issue[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$skip = _ref.skip,
        skip = _ref$skip === undefined ? 0 : _ref$skip,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
  }
};

/**
 * @typedef Issue
 */
exports.default = _mongoose2.default.model('Issue', IssueSchema);
module.exports = exports['default'];
//# sourceMappingURL=issue.model.js.map
