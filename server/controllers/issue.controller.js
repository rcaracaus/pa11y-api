import Issue from '../models/issue.model';

/**
 * Load issue and append to req.
 */
function load(req, res, next, id) {
  Issue.get(id)
    .then((issue) => {
      req.issue = issue; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get issue
 * @returns {Issue}
 */
function get(req, res) {
  return res.json(req.issue);
}

/**
 * Create new issue
 * @property {string} req.body.code - The code of issue.
 * @property {string} req.body.context - The context of issue.
 * @property {string} req.body.message - The message of issue.
 * @property {string} req.body.selector - The selector of an issue.
 * @property {string} req.body.type - The type of an issue.
 * @property {number} req.body.typeCode - The typeCode of an issue.
 * @property {string} req.body.url - The parent url of an issue.
 * @returns {Issue}
 */
function create(req, res, next) {
  const issue = new Issue({
    code: req.body.code,
    context: req.body.context,
    message: req.body.message,
    selector: req.body.selector,
    type: req.body.type,
    typeCode: req.body.typeCode,
    reportId: req.body.reportId,
    url: req.body.url
  });

  issue.save()
    .then(savedIssue => res.json(savedIssue))
    .catch(e => next(e));
}

/**
 * Update existing issue
 * @property {string} req.body.code - The code of issue.
 * @property {string} req.body.context - The context of issue.
 * @property {string} req.body.message - The message of issue.
 * @property {string} req.body.selector - The selector of an issue.
 * @property {string} req.body.type - The type of an issue.
 * @property {number} req.body.typeCode - The typeCode of an issue.
 * @property {string} req.body.url - The parent url of an issue.
 * @returns {Issue}
 */
function update(req, res, next) {
  const issue = req.issue;
  issue.code = req.body.code;
  issue.context = req.body.context;
  issue.message = req.body.message;
  issue.selector = req.body.selector;
  issue.type = req.body.type;
  issue.typeCode = req.body.typeCode;
  issue.url = req.body.url;

  issue.save()
    .then(savedIssue => res.json(savedIssue))
    .catch(e => next(e));
}

/**
 * Get issue list.
 * @property {number} req.query.skip - Number of issues to be skipped.
 * @property {number} req.query.limit - Limit number of issues to be returned.
 * @returns {Issue[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Issue.list({ limit, skip })
    .then(issues => res.json(issues))
    .catch(e => next(e));
}

/**
 * Delete issue.
 * @returns {Issue}
 */
function remove(req, res, next) {
  const issue = req.issue;
  issue.remove()
    .then(deletedIssue => res.json(deletedIssue))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
