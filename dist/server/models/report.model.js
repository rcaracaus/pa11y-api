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
 * UrlChildSchema
 */

var urlsChildSchema = new _mongoose2.default.Schema({ url: 'string' });

/**
 * Report Schema
 */
var ReportSchema = new _mongoose2.default.Schema({
  standard: {
    type: String,
    required: true
  },
  urls: [urlsChildSchema],
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
ReportSchema.method({});

/**
 * Statics
 */
ReportSchema.statics = {
  /**
   * Get Report
   * @param {ObjectId} id - The objectId of report.
   * @returns {Promise<Report, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (report) {
      if (report) {
        return report;
      }
      var err = new _APIError2.default('No such report exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List reports in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of reports to be skipped.
   * @param {number} limit - Limit number of reports to be returned.
   * @returns {Promise<Report[]>}
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
 * @typedef Report
 */
exports.default = _mongoose2.default.model('Report', ReportSchema);
module.exports = exports['default'];
//# sourceMappingURL=report.model.js.map
