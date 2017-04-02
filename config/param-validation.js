import Joi from 'joi';

export default {
  // POST /api/issues
  createIssue: {
    body: {
      code: Joi.string().required(),
      context: Joi.string().required(),
      message: Joi.string().required(),
      selector: Joi.string().required(),
      type: Joi.string().required(),
      typeCode: Joi.number().required(),
      reportId: Joi.string().required(),
      url: Joi.string().required()
    }
  },

  // UPDATE /api/issues/:issueId
  updateIssue: {
    body: {
      code: Joi.string().required(),
      context: Joi.string().required(),
      message: Joi.string().required(),
      selector: Joi.string().required(),
      type: Joi.string().required(),
      typeCode: Joi.number().required(),
      url: Joi.string().required()
    },
    params: {
      issueId: Joi.string().hex().required()
    }
  },

  // POST /api/reports
  createReport: {
    body: {
      rootUrl: Joi.string().required(),
      standard: Joi.string().required(),
      urls: Joi.array().items(Joi.string())
    }
  },

  // UPDATE /api/reports/:issueId
  updateReport: {
    body: {
      urls: Joi.array().items(Joi.string()),
      standard: Joi.string(),
      progress: Joi.number()
    },
    params: {
      reportId: Joi.string().hex().required()
    }
  },

  // POST /api/reports
  createUrl: {
    body: {
      reportId: Joi.string().hex().required(),
      url: Joi.string().required(),
      codes: Joi.array().items(Joi.string()).required(),
      nErrors: Joi.number().required(),
      nWarnings: Joi.number().required(),
      nNotices: Joi.number().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
