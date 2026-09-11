import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      // Generic error message to prevent account enumeration (RULE #9)
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'mpsa_super_secret_jwt_key_2026_change_in_production';
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Authentication successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server authentication error' });
  }
};

export const getMe = async (req, res) => {
  return res.json({
    success: true,
    admin: req.admin
  });
};

export const logoutAdmin = async (req, res) => {
  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
