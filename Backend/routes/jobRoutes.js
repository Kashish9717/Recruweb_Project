import express from 'express';
import { 
  getJobs, 
  getFeaturedJobs, 
  getJob, 
  createJob, 
  updateJob, 
  deleteJob,
  applyForJob,
  getJobApplications,
  seedJobs
} from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/seed', seedJobs);
router.get('/featured', getFeaturedJobs);
router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);
router.post('/:id/apply', applyForJob);
router.get('/:id/applications', protect, getJobApplications);

export default router;
