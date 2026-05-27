const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// POST /api/contacts - Public submission of form
router.post('/', createContact);

// Secured admin-only message endpoints
router.get('/', protect, admin, getContacts);
router.put('/:id', protect, admin, updateContactStatus);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
