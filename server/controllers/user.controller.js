import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import User from '../models/user.model';

const SALT_ROUNDS = 9;

/**
 * Load report and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Creates a new user
 *
 * @param  req
 * @param  res
 * @param  {Function} next
 * @return {*}
 */
function create(req, res, next) {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
  .then(passwordHash => {
    return new User({
      email: req.body.email,
      name: req.body.name,
      password: passwordHash
    });
  })
  .catch(e => next(e))
  .then(user => user.save())
  .catch(e => next(e))
  .then(user => {
    req.session.user = user._id;
    return res.json({
      authentication: 'login',
      email: user.email,
      name: user.name
    })
  })
  .catch(e => next(e));
}

/**
 * Logs a user in or returns the account associated with their session cookie
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  if (req.session) {
    if (req.session.user) {
      return User.get(req.session.user)
      .then(user => {
        return res.json({
          authentication: 'session',
          email: user.email,
          name: user.name
        })
      })
      .catch(() => next(new APIError('Authentication error', httpStatus.UNAUTHORIZED, true)));
    }
  }

  return User.getByEmail(req.body.email)
  .then(user => {
    return bcrypt.compare(req.body.password, user.password)
    .then(passwordCorrect => {
      if (passwordCorrect) {
        req.session.user = user._id; // set user id in database session
        return res.json({
          authentication: 'login',
          email: user.email,
          name: user.name
        });
      }
    });
  })
  .catch((err) => next(err));
}

/**
 * Removes a user
 *
 * @param  req
 * @param  res
 * @param  {Function} next
 * @return {*}
 */
function remove(req, res, next) {
  if (req.body.secret !== config.jwtSecret)
    return next(new APIError('Authentication error', httpStatus.UNAUTHORIZED, true));

  req.user.remove()
    .then(() => res.json({ message: 'User deleted' }))
    .catch(e => next(e));
}

export default { load, create, login, remove };
