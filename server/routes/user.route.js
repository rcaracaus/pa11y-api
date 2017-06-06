import expressJwt from 'express-jwt';
import express from 'express';
import validate from 'express-validation';
import RateLimit from 'express-rate-limit';
import config from '../../config/config';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

if (process.env.NODE_ENV !== 'test') {
  // rate limit the /user endpoint
  router.use(new RateLimit({
    windowMs: 60 * 1000, // every minute
    max: 3,
    delayMs: 0, // disabled
  }));
}

router.route('/')
  /** POST /api/user - Creates a new user, returns a newly created user */
  .post(validate(paramValidation.createUser), userCtrl.create)
  /** DELETE /api/user - Deletes the user associated with JWT */
  .delete(expressJwt({ secret: config.jwtSecret }), userCtrl.remove);

router.route('/login')
  /** POST /api/user/login - Returns user information if correct credentials provided */
  .post(validate(paramValidation.login), userCtrl.login);

router.route('/authenticate')
  /** GET /api/user/authenticate - Returns user information associated with JWT */
  .get(expressJwt({ secret: config.jwtSecret }), userCtrl.authenticate);

export default router;
