import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [500, 'Message cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
