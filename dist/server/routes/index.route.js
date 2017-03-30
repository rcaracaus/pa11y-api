'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _issue = require('./issue.route');

var _issue2 = _interopRequireDefault(_issue);

var _report = require('./report.route');

var _report2 = _interopRequireDefault(_report);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount issue routes at /issues
router.use('/issues', _issue2.default);

// mount issue routes at /issues
router.use('/reports', _report2.default);

// mount auth routes at /auth
router.use('/auth', _auth2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=index.route.js.map
