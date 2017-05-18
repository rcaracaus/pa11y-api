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

function create(req, res, next) {
  bcrypt.hash(req.body.password, SALT_ROUNDS).then((passwordHash) => {
    const user = new User({
      email: req.body.email,
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      },
      password: passwordHash
    });

    user.save()
    .then(savedUser => res.json({
      _id: savedUser._id,
      email: savedUser.email,
      name: {
        first: savedUser.name.first,
        last: savedUser.name.last
      }
    }))
    .catch(e => next(e));
  });
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity

  User.getByEmail(req.body.email)
  .then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then((passwordCorrect) => {
      if (passwordCorrect) {
        const token = jwt.sign({
          email: user.email
        },
        config.jwtSecret, {
          expiresIn: '24h'
        });
        return res.json({
          token,
          _id: user._id,
          email: user.email,
          name: {
            first: user.name.first,
            last: user.name.last
          }
        });
      }
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return next(err);
    });
  })
  .catch(err => next(err));
}

function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json({
      email: deletedUser.email,
      name: deletedUser.name
    }))
    .catch(e => next(e));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { load, create, remove, login, getRandomNumber };
