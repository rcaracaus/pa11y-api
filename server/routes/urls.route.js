import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import urlsCtrl from '../controllers/urls.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/urls - Get list of urls */
  .get(validate(paramValidation.listUrls), urlsCtrl.list);

export default router;
