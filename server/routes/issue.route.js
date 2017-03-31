import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import issueCtrl from '../controllers/issue.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/issues - Get list of issues */
  .get(issueCtrl.list)

  /** POST /api/issues - Create new issue */
  .post(validate(paramValidation.createIssue), issueCtrl.create);

router.route('/:issueId')
  /** GET /api/issues/:issueId - Get issue */
  .get(issueCtrl.get)

  /** PUT /api/issues/:issueId - Update issue */
  .put(validate(paramValidation.updateIssue), issueCtrl.update)

  /** DELETE /api/issues/:issueId - Delete issue */
  .delete(issueCtrl.remove);

/** Load issue when API with issueId route parameter is hit */
router.param('issueId', issueCtrl.load);

export default router;
