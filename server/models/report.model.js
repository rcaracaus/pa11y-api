import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Report Schema
 */
const ReportSchema = new mongoose.Schema({
  rootUrl: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  standard: {
    type: String,
    required: true
  },
  urls: [String],
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

/**
 * Methods
 */
ReportSchema.method({
});

/**
 * Statics
 */
ReportSchema.statics = {
  /**
   * Get Report
   * @param {ObjectId} id - The objectId of report.
   * @returns {Promise<Report, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((report) => {
        if (report) {
          return report;
        }
        const err = new APIError('No such report exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List reports in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of reports to be skipped.
   * @param {number} limit - Limit number of reports to be returned.
   * @returns {Promise<Report[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Report
 */
export default mongoose.model('Report', ReportSchema);
