// Run: npm run seed
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    const email = 'admin@example.com';
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Seed user already exists:', email);
      process.exit(0);
    }

    const password = 'Admin@123';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashed, role: 'admin' });
    await user.save();
    console.log('Seed user created:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();