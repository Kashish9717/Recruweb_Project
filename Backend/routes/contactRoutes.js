import express from 'express';
import { createContact, getContacts, getContact, updateContactStatus, deleteContact } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, getContacts);
router.get('/:id', protect, getContact);
router.put('/:id', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

export default router;
