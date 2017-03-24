import Report from '../models/report.model';

/**
 * Load report and append to req.
 */
function load(req, res, next, id) {
  Report.get(id)
    .then((report) => {
      req.report = report; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Reort
 * @returns {Report}
 */
function get(req, res) {
  return res.json(req.report);
}

/**
 * Create new report
 * @property {array} req.body.urls - The array of urls the report uses.
 * @property {string} req.body.standard - The standard the report uses.
 * @returns {Report}
 */
function create(req, res, next) {
  const report = new Report({
    urls: req.body.urls,
    standard: req.body.standard,
  });

  report.save()
    .then(savedReport => res.json(savedReport))
    .catch(e => next(e));
}

/**
 * Update existing report
 * @property {array} req.body.urls - The array of urls the report uses.
 * @property {string} req.body.standard - The standard the report uses.
 * @returns {Report}
 */
function update(req, res, next) {
  const report = req.report;
  report.urls = req.body.urls;
  report.standard = req.body.standard;

  report.save()
    .then(savedReport => res.json(savedReport))
    .catch(e => next(e));
}

/**
 * Get report list.
 * @property {number} req.query.skip - Number of reports to be skipped.
 * @property {number} req.query.limit - Limit number of reports to be returned.
 * @returns {Report[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Report.list({ limit, skip })
    .then(reports => res.json(reports))
    .catch(e => next(e));
}

/**
 * Delete report.
 * @returns {Report}
 */
function remove(req, res, next) {
  const report = req.report;
  report.remove()
    .then(deletedReport => res.json(deletedReport))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
