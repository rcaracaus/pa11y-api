'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/issues
  createIssue: {
    body: {
      code: _joi2.default.string().required(),
      context: _joi2.default.string().required(),
      message: _joi2.default.string().required(),
      selector: _joi2.default.string().required(),
      type: _joi2.default.string().required(),
      typeCode: _joi2.default.number().required(),
      url: _joi2.default.string().required()
    }
  },

  // UPDATE /api/issues/:issueId
  updateIssue: {
    body: {
      code: _joi2.default.string().required(),
      context: _joi2.default.string().required(),
      message: _joi2.default.string().required(),
      selector: _joi2.default.string().required(),
      type: _joi2.default.string().required(),
      typeCode: _joi2.default.number().required(),
      url: _joi2.default.string().required()
    },
    params: {
      issueId: _joi2.default.string().hex().required()
    }
  },

  // POST /api/reports
  createReport: {
    body: {
      urls: _joi2.default.array().items(_joi2.default.object().keys({
        url: _joi2.default.string().required()
      })),
      standard: _joi2.default.string().required()
    }
  },

  // UPDATE /api/reports/:issueId
  updateReport: {
    body: {
      urls: _joi2.default.array().items(_joi2.default.object().keys({
        url: _joi2.default.string().required()
      })),
      standard: _joi2.default.string().required()
    },
    params: {
      reportId: _joi2.default.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: _joi2.default.string().required(),
      password: _joi2.default.string().required()
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=param-validation.js.map
