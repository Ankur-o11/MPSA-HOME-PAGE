import mongoose from 'mongoose';
import dns from 'dns';

// Fix Windows DNS resolution issue for MongoDB Atlas SRV lookup
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // fallback
}

import Admin from '../models/Admin.js';

export const syncAdminCredentials = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@mpsaschool.edu.in').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'MPSA Administrator';

    if (!adminPassword) return;

    let admin = await Admin.findOne({ email: adminEmail }) || await Admin.findOne({ role: 'super_admin' });
    const passwordHash = await Admin.hashPassword(adminPassword);

    if (!admin) {
      admin = new Admin({ name: adminName, email: adminEmail, passwordHash, role: 'super_admin' });
      await admin.save();
      console.log('[Admin Sync] Created initial super admin in MongoDB Atlas.');
    } else {
      const isMatch = await admin.matchPassword(adminPassword);
      if (!isMatch || admin.email !== adminEmail) {
        admin.name = adminName;
        admin.email = adminEmail;
        admin.passwordHash = passwordHash;
        await admin.save();
        console.log('[Admin Sync] Synchronized admin credentials in MongoDB Atlas with .env');
      }
    }
  } catch (err) {
    console.warn('[Admin Sync Warning]', err.message);
  }
};

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.warn('MongoDB Warning: MONGODB_URI is not defined in .env environment variables.');
      return;
    }

    const conn = await mongoose.connect(connStr, {
      dbName: 'mpsa_home_page' // Explicitly targets separate mpsa_home_page DB
    });

    console.log(`[MongoDB Atlas] Connected successfully.`);
    console.log(`[MongoDB Atlas] Active Database Target: "${conn.connection.name}"`);
    
    if (conn.connection.name !== 'mpsa_home_page') {
      console.warn(`[Database Warning] Connected to "${conn.connection.name}" instead of "mpsa_home_page".`);
    }

    await syncAdminCredentials();
  } catch (error) {
    console.warn(`[MongoDB Connection Warning] ${error.message}. Server will continue running.`);
  }
};
