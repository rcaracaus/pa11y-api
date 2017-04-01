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
      urls: Joi.array().items(Joi.string()),
      standard: Joi.string().required()
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

  // GET /api/urls
  listUrls: {
    query: {
      reportId: Joi.string().hex().required()
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
