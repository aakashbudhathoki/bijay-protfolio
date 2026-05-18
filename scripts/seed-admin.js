const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bijay-portfolio'

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true })

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const existing = await Admin.findOne({ email: 'bijayofficial03@gmail.com' })
    if (existing) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    await Admin.create({
      email: 'bijayofficial03@gmail.com',
      password: '#Bijay@123',
    })

    console.log('Admin user created successfully')
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

seedAdmin()
