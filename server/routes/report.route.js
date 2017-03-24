import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import reportCtrl from '../controllers/report.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/reports - Get list of reports */
  .get(reportCtrl.list)

  /** POST /api/reports - Create new report */
  .post(validate(paramValidation.createReport), reportCtrl.create);

router.route('/:reportId')
  /** GET /api/reports/:reportId - Get report */
  .get(reportCtrl.get)

  /** PUT /api/reports/:reportId - Update report */
  .put(validate(paramValidation.updateReport), reportCtrl.update)

  /** DELETE /api/reports/:reportId - Delete report */
  .delete(reportCtrl.remove);

/** Load report when API with reportId route parameter is hit */
router.param('reportId', reportCtrl.load);

export default router;
