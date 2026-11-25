const BASE = import.meta.env.BASE_URL;

export const LOGO_URL = BASE + 'logo/' + encodeURIComponent('Screenshot 2026-08-06 at 16.58.53.png');
export const PORTRAIT_URL = BASE + 'hero/portrait.png';

export const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'members', label: 'Members' },
  { id: 'testimonials', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const testimonialFile = (name) => BASE + 'testimonial/' + encodeURIComponent(name);

export const GALLERY = [
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.16.24 PM.jpeg'),
    caption: 'Scholarship distribution — supporting students in Palungtar',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.16.24 PM(1).jpeg'),
    caption: 'Tulasiman Shrestha Scholarship recipients with guardians',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.17.57 PM.jpeg'),
    caption: 'A gathering of the society family and well-wishers',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.18.14 PM.jpeg'),
    caption: 'Students at a partner school in Palungtar, Gorkha',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.18.52 PM.jpeg'),
    caption: 'Recognising merit and need among young learners',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.36.09 PM.jpeg'),
    caption: 'Members and guests at an annual society programme',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.36.30 PM.jpeg'),
    caption: 'Felicitating meritorious students from humble homes',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.36.46 PM.jpeg'),
    caption: 'Moments from an education and cultural awareness programme',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.37.30 PM.jpeg'),
    caption: 'Young scholars encouraged through the society scholarship',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.37.47 PM.jpeg'),
    caption: 'Support and blessings for a new academic session',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.38.03 PM.jpeg'),
    caption: 'Together we rise — a day with the TSMS family',
  },
];

export const PROGRAMS = [
  { id: 'honour', icon: 'award' },
  { id: 'scholarship', icon: 'book' },
  { id: 'endowment', icon: 'heart' },
  { id: 'folk', icon: 'lamp' },
  { id: 'education', icon: 'pencil' },
  { id: 'harmony', icon: 'users' },
];

export const FAQS = [
  { id: 'what' },
  { id: 'objectives' },
  { id: 'honour' },
  { id: 'scholarship' },
  { id: 'funding' },
  { id: 'membership' },
  { id: 'where' },
  { id: 'registered' },
];

export const CONTACT = {
  address: 'Ward No. 16, Anamnagar, Kathmandu Metropolitan City, Nepal',
  phone: '+977-1-4101103',
  mobile: '',
  email: 'info@tsmsociety.org.np',
  hours: 'Sunday – Friday, 10:00 AM – 5:00 PM',
  mapEmbed:
    'https://maps.google.com/maps?q=Anamnagar,%20Kathmandu,%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed',
};
