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

var _report = require('../controllers/report.controller');

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/reports - Get list of reports */
.get(_report2.default.list)

/** POST /api/reports - Create new report */
.post((0, _expressValidation2.default)(_paramValidation2.default.createReport), _report2.default.create);

router.route('/:reportId')
/** GET /api/reports/:reportId - Get report */
.get(_report2.default.get)

/** PUT /api/reports/:reportId - Update report */
.put((0, _expressValidation2.default)(_paramValidation2.default.updateReport), _report2.default.update)

/** DELETE /api/reports/:reportId - Delete report */
.delete(_report2.default.remove);

/** Load report when API with reportId route parameter is hit */
router.param('reportId', _report2.default.load);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=report.route.js.map
