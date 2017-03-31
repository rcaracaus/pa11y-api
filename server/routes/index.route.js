import express from 'express';
import issueRoutes from './issue.route';
import reportRoutes from './report.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount issue routes at /issues
router.use('/issues', issueRoutes);

// mount issue routes at /issues
router.use('/reports', reportRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
