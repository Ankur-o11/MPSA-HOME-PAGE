import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const inputEmail = email.toLowerCase().trim();
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@mpsaschool.edu.in').toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_PASSWORD;

    let admin = await Admin.findOne({ email: inputEmail });

    if (!admin && inputEmail === envAdminEmail) {
      admin = await Admin.findOne({ role: 'super_admin' });
    }

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    let isMatch = await admin.matchPassword(password);

    // Dynamic sync if user updated .env password while server was running
    if (!isMatch && envAdminPassword && password === envAdminPassword) {
      admin.passwordHash = await Admin.hashPassword(password);
      admin.email = inputEmail;
      await admin.save();
      isMatch = true;
    }

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
