import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }

    if (!token) {
      return res.status(401).json({ message: '401 Unauthorized: Access token missing' });
    }

    // Verify Token
    const jwtSecret = process.env.JWT_SECRET || 'mpsa_super_secret_jwt_key_2026_change_in_production';
    const decoded = jwt.verify(token, jwtSecret);

    // Fetch Admin
    const admin = await Admin.findById(decoded.id).select('-passwordHash');
    if (!admin) {
      return res.status(401).json({ message: '401 Unauthorized: Administrator account not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: '401 Unauthorized: Invalid or expired authentication token' });
  }
};
