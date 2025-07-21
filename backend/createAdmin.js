// Load environment variables (like MONGO_URI and JWT_SECRET)
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/admin.js';

dotenv.config();

const adminEmail = 'manusaviour5@gmail.com'; // your admin email
const adminPassword = 'Manu@5456'; // your desired password

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  let admin = await Admin.findOne({ email: adminEmail });
  if (admin) {
    console.log('Admin already exists. Deleting...');
    await Admin.deleteOne({ email: adminEmail });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  admin = new Admin({
    email: adminEmail,
    password: hashedPassword,
    role: 'admin'
  });

  await admin.save();
  console.log('Admin created successfully!');
  mongoose.disconnect();
}

createAdmin();