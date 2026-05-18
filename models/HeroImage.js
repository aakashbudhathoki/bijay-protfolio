import mongoose from 'mongoose'

const HeroImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

export default mongoose.models.HeroImage || mongoose.model('HeroImage', HeroImageSchema)
