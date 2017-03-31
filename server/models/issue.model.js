import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Issue Schema
 */
const IssueSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  selector: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  typeCode: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  reportId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

IssueSchema.query.byCode = function byCode(code) {
  return this.find({ code: new RegExp(code, 'i') });
};

IssueSchema.query.byReport = function byReport(reportId) {
  return this.find({ reportId: new RegExp(reportId, 'i') });
};

/**
 * Methods
 */
IssueSchema.method({
});

/**
 * Statics
 */
IssueSchema.statics = {
  /**
   * Get Issue
   * @param {ObjectId} id - The objectId of issue.
   * @returns {Promise<Issue, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((issue) => {
        if (issue) {
          return issue;
        }
        const err = new APIError('No such issue exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List issues in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of issues to be skipped.
   * @param {number} limit - Limit number of issues to be returned.
   * @returns {Promise<Issue[]>}
   */
  list({ skip = 0, limit = 50, code = '', reportId = '' } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .byCode(code)
      .byReport(reportId)
      .skip(skip)
      .limit(limit)
      .exec();
  }

};

/**
 * @typedef Issue
 */
export default mongoose.model('Issue', IssueSchema);
