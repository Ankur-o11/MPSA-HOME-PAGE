import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import sharp from 'sharp';
import dns from 'dns';
import Gallery from './models/Gallery.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

async function runOptimization() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
  }

  console.log('[Gallery Migration] Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri, { dbName: 'mpsa_home_page' });
  console.log('[Gallery Migration] Connected successfully.');

  const items = await Gallery.find();
  console.log(`[Gallery Migration] Found ${items.length} Gallery documents in MongoDB.`);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const doc of items) {
    if (!doc.image) {
      skippedCount++;
      continue;
    }

    if (doc.image.startsWith('data:image')) {
      const parts = doc.image.split(';base64,');
      if (parts.length === 2 && !parts[0].includes('svg')) {
        const rawBuffer = Buffer.from(parts[1], 'base64');
        const origSize = rawBuffer.length;
        totalOriginalBytes += origSize;

        try {
          const optimizedBuffer = await sharp(rawBuffer)
            .resize({
              width: 1000,
              height: 1000,
              fit: 'inside',
              withoutEnlargement: true
            })
            .jpeg({ quality: 80, mozjpeg: true })
            .toBuffer();

          const optSize = optimizedBuffer.length;
          totalOptimizedBytes += optSize;

          doc.image = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;
          await doc.save();

          updatedCount++;
          console.log(`✓ Optimized "${doc.title || doc._id}": ${(origSize / 1024).toFixed(1)} KB -> ${(optSize / 1024).toFixed(1)} KB (-${(((origSize - optSize) / origSize) * 100).toFixed(1)}%)`);
        } catch (sharpErr) {
          console.warn(`! Warning optimizing item "${doc._id}":`, sharpErr.message);
          totalOptimizedBytes += origSize;
        }
      } else {
        skippedCount++;
      }
    } else {
      // Image is an HTTP URL or relative path
      skippedCount++;
    }
  }

  console.log('\n--- Gallery Optimization Summary ---');
  console.log(`Total Documents Processed: ${items.length}`);
  console.log(`Optimized Records: ${updatedCount}`);
  console.log(`Skipped Records (URLs/SVG): ${skippedCount}`);
  if (totalOriginalBytes > 0) {
    const origMB = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
    const optMB = (totalOptimizedBytes / (1024 * 1024)).toFixed(2);
    const savingsPct = (((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1);
    console.log(`Original Data Size: ${origMB} MB (${totalOriginalBytes} bytes)`);
    console.log(`Optimized Data Size: ${optMB} MB (${totalOptimizedBytes} bytes)`);
    console.log(`Total Storage Savings: ${savingsPct}% reduction`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

runOptimization().catch(err => {
  console.error('[Gallery Migration Error]', err);
  process.exit(1);
});
