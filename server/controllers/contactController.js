const Contact = require('../models/Contact');

// @desc    Submit a contact inquiry
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      data: contact,
    });
  } catch (error) {
    console.error('Contact Submission Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error processing inquiry' });
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Fetch Contacts Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error retrieving inquiries' });
  }
};

// @desc    Update a contact inquiry status (e.g. read/unread)
// @route   PUT /api/contacts/:id
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['read', 'unread'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid status ("read" or "unread")' });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    contact.status = status;
    await contact.save();

    res.status(200).json({
      success: true,
      message: `Inquiry marked as ${status}`,
      data: contact,
    });
  } catch (error) {
    console.error('Update Contact Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error updating inquiry status' });
  }
};

// @desc    Delete a contact inquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    console.error('Delete Contact Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error deleting inquiry' });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
};
