const mongoose = require('mongoose');
const User = require('./modles/user');
require('dotenv').config();

// Default admin credentials
const ADMIN_EMAIL = 'admin@portfolio.com';
const ADMIN_PASSWORD = 'admin123';

async function resetAdmin() {
    try {
        // Connect to MongoDB
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            console.error('❌ MONGO_URL environment variable not set!');
            process.exit(1);
        }
        
        await mongoose.connect(mongoUrl);
        console.log('✅ Connected to MongoDB');

        // Delete existing admin user
        const deleted = await User.findOneAndDelete({ email: ADMIN_EMAIL });
        if (deleted) {
            console.log('🗑️  Deleted existing admin user');
        }

        // Create new admin user
        const admin = await User.create({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: 'admin'
        });

        console.log('✅ New admin user created successfully!');
        console.log('📧 Email:', ADMIN_EMAIL);
        console.log('🔒 Password:', ADMIN_PASSWORD);
        console.log('🆔 User ID:', admin._id);

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

resetAdmin();
