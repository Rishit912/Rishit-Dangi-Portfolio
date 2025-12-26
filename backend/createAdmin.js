const mongoose = require('mongoose');
const User = require('./modles/user');
require('dotenv').config();

// Default admin credentials
const ADMIN_EMAIL = 'admin@portfolio.com';
const ADMIN_PASSWORD = 'admin123';

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/SketchCode');
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
        
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email:', ADMIN_EMAIL);
            console.log('🔒 Password:', ADMIN_PASSWORD);
        } else {
            // Create new admin user (password will be hashed automatically by the model)
            const admin = await User.create({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                role: 'admin'
            });

            console.log('✅ Admin user created successfully!');
            console.log('📧 Email:', ADMIN_EMAIL);
            console.log('🔒 Password:', ADMIN_PASSWORD);
            console.log('🆔 User ID:', admin._id);
        }

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createAdmin();
