import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Url Schema
 */
const UrlSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  codes: {
    type: [String],
    required: true
  },
  nErrors: {
    type: Number,
    required: true
  },
  nWarnings: {
    type: Number,
    required: true
  },
  nNotices: {
    type: Number,
    required: true
  }
});

/**
 * Methods
 */
UrlSchema.method({
});

UrlSchema.query.byCode = function byCode(code) {
  return this.find({ code: new RegExp(code, 'i') });
};

UrlSchema.query.byReport = function byReport(reportId) {
  return this.find({ reportId: new RegExp(reportId, 'i') });
};

/**
 * Statics
 */
UrlSchema.statics = {

  /**
   * Get Url
   * @param {ObjectId} id - The objectId of issue.
   * @returns {Promise<Url, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((url) => {
        if (url) {
          return url;
        }
        const err = new APIError('No such url exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List urls which have a specific code.
   * @param {number} skip - Number of issues to be skipped.
   * @param {number} limit - Limit number of issues to be returned.
   * @returns {Promise<Issue[]>}
   */
  list({ limit = 50, skip = 0, reportId = '', code = '' } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .byCode(code)
      .byReport(reportId)
      .skip(+skip)
      .limit(+limit)
      .exec();
  }

};

/**
 * @typedef Url
 */
export default mongoose.model('Url', UrlSchema);
