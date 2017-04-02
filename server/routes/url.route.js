import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import urlCtrl from '../controllers/url.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/urls - Get list of urls */
  .get(urlCtrl.list)
  /** POST /api/urls - Create a new url */
  .post(validate(paramValidation.createUrl), urlCtrl.create);

router.route('/:urlId')
  /** GET /api/url - Get a url */
  .get(urlCtrl.get)
  /** DELETE /api/urls/:urlId - Delete a url */
  .delete(urlCtrl.remove);

/** Load url when API with urlId route parameter is hit */
router.param('urlId', urlCtrl.load);

export default router;
