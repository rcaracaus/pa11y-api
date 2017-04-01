import Issue from '../models/issue.model';

/**
 * Get urls list.
 * @property {number} req.query.skip - Number of issues to be skipped.
 * @property {number} req.query.limit - Limit number of issues to be returned.
 * @returns {Issue[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0, code = '', reportId = '' } = req.query;
  Issue.listUrls({ limit, skip, code, reportId })
    .then(urls => res.json(urls))
    .catch(e => next(e));
}

export default { list };
