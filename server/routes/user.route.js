import express from 'express';
import validate from 'express-validation';
import RateLimit from 'express-rate-limit';
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
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/login')
  /** POST /api/user/login - Returns user information if correct credentials provided */
  .post(validate(paramValidation.login), userCtrl.login);

router.param('userId', userCtrl.load);

export default router;
