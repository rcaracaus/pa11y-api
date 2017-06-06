import config from './config/config';
import expressApp from './config/express';

const debug = require('debug')('pa11y-api:index');

const app = expressApp(debug);

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
