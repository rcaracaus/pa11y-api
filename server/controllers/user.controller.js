import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config/config';
import APIError from '../helpers/APIError';
import User from '../models/user.model';

const SALT_ROUNDS = 9;

/**
 * Creates a new user
 *
 * @param  req
 * @param  res
 * @param  {Function} next
 * @return {*}
 */
function create(req, res, next) {
  bcrypt
  .hash(req.body.password, SALT_ROUNDS)
  .then(passwordHash => new User({
    email: req.body.email,
    name: req.body.name,
    password: passwordHash
  }))
  .catch(e => next(e))
  .then(user => user.save())
  .catch(e => next(e))
  .then((user) => {
    const accessToken = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: '24h' });
    return res.json({
      token: accessToken,
      authentication: 'login',
      email: user.email,
      name: user.name
    });
  })
  .catch(e => next(e));
}

/**
 * Logs a user in by creating an access token for their account
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  User
  .getByEmail(req.body.email)
  .then(user => (bcrypt.compare(req.body.password, user.password)
    .then((passwordCorrect) => {
      const accessToken = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: '24h' });
      if (passwordCorrect) {
        return res.json({
          token: accessToken,
          authentication: 'login',
          email: user.email,
          name: user.name
        });
      }
      throw Error();
    })
  ))
  .catch(() => next(new APIError('Unauthorized', httpStatus.UNAUTHORIZED, true)));
}

/**
 * Verifies an access token and returns information about the associated user
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function authenticate(req, res, next) {
  if (req.user.email) {
    User
    .getByEmail(req.user.email)
    .then(user => res.json({
      authentication: 'token',
      email: user.email,
      name: user.name
    }))
    .catch(() => next(new APIError('Unauthorized', httpStatus.UNAUTHORIZED, true)));
  }
}

/**
 * Reads an access token and deletes the associated users account
 *
 * @param  req
 * @param  res
 * @param  {Function} next
 * @return {*}
 */
function remove(req, res, next) {
  if (req.user.email) {
    User
    .removeByEmail(req.user.email)
    .then(() => res.json({ message: 'User deleted' }))
    .catch(e => next(e));
  }
}

export default { create, login, authenticate, remove };
