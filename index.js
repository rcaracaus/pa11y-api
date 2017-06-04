import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';

// import express-session and the MongoStore to store session data
import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);

const debug = require('debug')('pa11y-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = `${config.mongo.host}:${config.mongo.port}/${config.mongo.db}?authSource=admin`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.use(session({
  secret: config.jwtSecret,
  resave: false,
  saveUnitialized: true,
  cookie: { secure: true, httpOnly: false, maxAge: 86400 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
