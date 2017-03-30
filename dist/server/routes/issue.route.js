'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _issue = require('../controllers/issue.controller');

var _issue2 = _interopRequireDefault(_issue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/issues - Get list of issues */
.get(_issue2.default.list)

/** POST /api/issues - Create new issue */
.post((0, _expressValidation2.default)(_paramValidation2.default.createIssue), _issue2.default.create);

router.route('/:issueId')
/** GET /api/issues/:issueId - Get issue */
.get(_issue2.default.get)

/** PUT /api/issues/:issueId - Update issue */
.put((0, _expressValidation2.default)(_paramValidation2.default.updateIssue), _issue2.default.update)

/** DELETE /api/issues/:issueId - Delete issue */
.delete(_issue2.default.remove);

/** Load issue when API with issueId route parameter is hit */
router.param('issueId', _issue2.default.load);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=issue.route.js.map
