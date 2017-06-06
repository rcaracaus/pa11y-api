import Url from '../models/url.model';

/**
 * Load url and append to req.
 */
function load(req, res, next, id) {
  Url.get(id)
    .then((url) => {
      req.url = url; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Load url and append to req.
 */
function get(req, res) {
  res.json(req.url);
}

/**
 * Delete url.
 * @returns {Url}
 */
function remove(req, res, next) {
  const url = req.url;

  url.remove()
    .then(deletedUrl => res.json(deletedUrl))
    .catch(e => next(e));
}

function create(req, res, next) {
  const url = new Url({
    reportId: req.body.reportId,
    url: req.body.url,
    codes: req.body.codes,
    nErrors: req.body.nErrors,
    nWarnings: req.body.nWarnings,
    nNotices: req.body.nNotices
  });

  url.save()
    .then(savedUrl => res.json(savedUrl))
    .catch(e => next(e));
}

/**
 * Get urls list.
 * @property {number} req.query.skip - Number of issues to be skipped.
 * @property {number} req.query.limit - Limit number of issues to be returned.
 * @returns {Issue[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0, reportId = '', code = '', url = '' } = req.query;
  const decodedURL = decodeURIComponent(url); // decode the url

  Url.list({ limit, skip, reportId, code, url: decodedURL })
    .then(urls => res.json(urls))
    .catch(e => next(e));
}

export default { get, load, remove, create, list };
