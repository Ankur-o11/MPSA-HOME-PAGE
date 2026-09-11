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
  } catch (error) {
    console.warn(`[MongoDB Connection Warning] ${error.message}. Server will continue running.`);
  }
};
