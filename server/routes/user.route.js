import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/')
  /** POST /api/user - Creates a new user, returns a newly created user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  /** DELETE /api/user - Deletes a user, returns the deleted user */
  .delete(validate(paramValidation.removeUser), userCtrl.remove);

/** POST /api/user/login
 * Returns user information if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), userCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), userCtrl.getRandomNumber);

router.param('userId', userCtrl.load);

export default router;
