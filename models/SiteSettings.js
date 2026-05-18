import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  global: {
    primaryColor: { type: String, default: '#2563eb' },
    fontFamily: { type: String, default: 'Arial, Helvetica, sans-serif' },
  },
  hero: {
    title: { type: String, default: "Hi, I'm Bijay Karki" },
    titleColor: { type: String, default: '#ffffff' },
    titleSize: { type: String, default: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl' },
    subtitle: { type: String, default: 'Sales Head at Mypower' },
    subtitleColor: { type: String, default: '#ffffff' },
    subtitleSize: { type: String, default: 'text-xl sm:text-2xl md:text-3xl' },
    description: { type: String, default: 'Driving sales excellence in premium mobile accessories. With years of experience in the industry, I help customers find the perfect tech solutions for their needs.' },
    descriptionColor: { type: String, default: '#ffffff' },
    descriptionSize: { type: String, default: 'text-base md:text-lg' },
    showInitials: { type: Boolean, default: true },
    initials: { type: String, default: 'BK' },
    experienceYears: { type: String, default: '10+' },
    happyClients: { type: String, default: '500+' },
    ctaPrimary: { type: String, default: 'Get in Touch' },
    ctaSecondary: { type: String, default: 'Learn More' },
  },
  about: {
    title: { type: String, default: 'About Me' },
    titleSize: { type: String, default: 'text-3xl sm:text-4xl' },
    description: { type: String, default: '' },
    journeyTitle: { type: String, default: 'My Journey' },
    journeyText1: { type: String, default: 'Starting as a sales executive, I worked my way up to become the Sales Head at Mypower, one of the leading mobile accessories brands. My passion for technology and customer satisfaction has driven me to excel in this competitive industry.' },
    journeyText2: { type: String, default: 'I believe in building lasting relationships with clients and understanding their needs to provide the best solutions. My approach combines data-driven strategies with personal touch to deliver exceptional results.' },
    whyChooseTitle: { type: String, default: 'Why Choose Me?' },
    whyChooseItems: {
      type: [String],
      default: [
        'Expert knowledge in mobile accessories market',
        'Proven track record of exceeding sales targets',
        'Strong network of distributors and retailers',
        'Dedicated to customer satisfaction and support',
      ],
    },
    stats: {
      type: [
        { label: String, value: String },
      ],
      default: [
        { label: 'Years Experience', value: '10+' },
        { label: 'Clients Served', value: '500+' },
        { label: 'Revenue Growth', value: '150%' },
        { label: 'Team Size', value: '25+' },
      ],
    },
  },
  services: {
    title: { type: String, default: 'What I Do' },
    titleSize: { type: String, default: 'text-3xl sm:text-4xl' },
    description: { type: String, default: 'As Sales Head at Mypower, I oversee multiple aspects of the sales operation to ensure success in the mobile accessories market.' },
  },
  achievements: {
    title: { type: String, default: 'Achievements' },
    titleSize: { type: String, default: 'text-3xl sm:text-4xl' },
    description: { type: String, default: 'Milestones and accomplishments that reflect my dedication to excellence in sales.' },
  },
  products: {
    title: { type: String, default: 'Mypower Products' },
    titleSize: { type: String, default: 'text-3xl sm:text-4xl' },
    description: { type: String, default: 'Discover our range of premium mobile accessories designed for quality and performance.' },
  },
  contact: {
    title: { type: String, default: 'Get in Touch' },
    titleSize: { type: String, default: 'text-3xl sm:text-4xl' },
    description: { type: String, default: "Interested in Mypower products or want to discuss business opportunities? Let's connect!" },
    location: { type: String, default: 'Kathmandu, Nepal' },
    email: { type: String, default: 'bijayofficial03@gmail.com' },
    phone: { type: String, default: '+977-984886695' },
    businessHoursTitle: { type: String, default: 'Business Hours' },
    businessHoursWeek: { type: String, default: 'Sunday - Friday: 10:00 AM - 6:00 PM' },
    businessHoursWeekend: { type: String, default: 'Saturday: Closed' },
  },
  footer: {
    description: { type: String, default: 'Sales Head at Mypower - Your trusted partner for premium mobile accessories.' },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
  },
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)
