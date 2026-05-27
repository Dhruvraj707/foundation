const User = require('../models/User');

// @desc    Get all users (excluding passwords)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Fetch Users Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error retrieving users' });
  }
};

// @desc    Update a user's role (admin / user)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid role ("user" or "admin")' });
    }

    // Prevent current admin from demoting themselves
    if (req.user._id.toString() === req.params.id && role === 'user') {
      return res.status(400).json({ success: false, message: 'For safety reasons, you cannot demote yourself from admin status.' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role successfully updated to ${role}`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update User Role Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error updating user role' });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
};
