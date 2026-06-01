import express from 'express';
import { 
  getCompanies, 
  getFeaturedCompanies,
  getCompany, 
  createCompany, 
  updateCompany, 
  deleteCompany,
  getIndustries,
  seedCompanies
} from '../controllers/companyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/seed', seedCompanies);
router.get('/industries', getIndustries);
router.get('/featured', getFeaturedCompanies);
router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', protect, createCompany);
router.put('/:id', protect, updateCompany);
router.delete('/:id', protect, deleteCompany);

export default router;
