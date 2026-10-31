const BASE = import.meta.env.BASE_URL;

export const LOGO_URL = BASE + 'logo/' + encodeURIComponent('Screenshot 2026-08-06 at 16.58.53.png');

export const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'members', label: 'Members' },
  { id: 'testimonials', label: 'Events' },
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
  {
    np: 'लोकसाहित्य सम्मान',
    title: 'Folk Literature Honour',
    text: 'The Tulasiman Shrestha Folk Literature Honour (Rs 25,000) recognises personalities who enrich Nepali folk literature and folk music — continuing since 2075 B.S.',
    icon: 'award',
  },
  {
    np: 'छात्रवृत्ति कार्यक्रम',
    title: 'Scholarship Programme',
    text: 'Need- and merit-based scholarships of Rs 10,000 for economically disadvantaged yet capable students at Jeevan Jyoti Secondary School and Rajgare Secondary School in Palungtar, Gorkha.',
    icon: 'book',
  },
  {
    np: 'अक्षय कोष',
    title: 'Endowment Fund',
    text: 'A lasting fund built from family contributions and lifetime membership fees — aimed at strengthening the folk literature honour and supporting partner schools in Palungtar.',
    icon: 'heart',
  },
  {
    np: 'लोक साहित्य र संगीत',
    title: 'Folk Literature & Music',
    text: 'Programmes that uplift and preserve Nepali folk literature and folk music, honouring the scholarly legacy of Late Tulasiman Shrestha.',
    icon: 'lamp',
  },
  {
    np: 'शिक्षा र संस्कृति',
    title: 'Education & Culture',
    text: 'Promoting education, social service and cultural activities so that learning and heritage walk hand in hand for the next generation.',
    icon: 'pencil',
  },
  {
    np: 'सद्भाव र प्रेरणा',
    title: 'Harmony & Inspiration',
    text: 'Programmes that inspire young people and advance cooperation, unity and goodwill in society — in memory of Late Tulasiman Shrestha\'s ideals.',
    icon: 'users',
  },
];

export const FAQS = [
  {
    q: 'What is the Tulasiman Shrestha Memorial Society?',
    a: 'We are a non-profit social organisation established in the name of Late Tulasiman Shrestha after his passing in 2073 B.S. Registered with the District Administration Office, Kathmandu (Reg. No. 652) and the Social Welfare Council (Reg. No. 47530), we honour his legacy through folk literature, education, scholarships and social service.',
  },
  {
    q: 'What are the main objectives of the society?',
    a: 'To remember Late Tulasiman Shrestha\'s ideas and contributions; promote folk literature and folk music; advance education, social service and cultural activities; inspire the new generation; foster cooperation, unity and harmony; and provide scholarships to economically disadvantaged and meritorious students.',
  },
  {
    q: 'What is the Tulasiman Shrestha Folk Literature Honour?',
    a: 'It is an annual honour of Rs 25,000 awarded to personalities working for the upliftment of Nepali folk literature and folk music. Recipients since 2075 B.S. include Prof. Dr. Chudamani Bandhu, Satya Mohan Joshi, Nanda Krishna Joshi, Gyanu Rana, Prof. Tulasi Diwas, Prof. Dr. Kusumakar Neupane, Raju Pariyar and Raju Babu Shrestha.',
  },
  {
    q: 'Who receives the Tulasiman Shrestha Scholarship?',
    a: 'Economically disadvantaged and meritorious students studying at Shree Jeevan Jyoti Secondary School, Biruwatar, Palungtar and Shree Rajgare Secondary School, Kamaltar, Palungtar in Gorkha district. Each scholarship is Rs 10,000, and the programme continues every year.',
  },
  {
    q: 'How is the society funded?',
    a: 'Through contributions from Late Tulasiman Shrestha\'s family and relatives, lifetime membership fees, and support from well-wishers. An endowment fund (अक्षय कोष) has been established to sustain the folk literature honour and school support.',
  },
  {
    q: 'Can I become a member or support the society?',
    a: 'Yes. The society has more than 80 lifetime members across Nepal, the USA, Germany, Taiwan, Denmark and elsewhere. Reach us through the contact page to learn about membership, donations or volunteering.',
  },
  {
    q: 'Where does the society operate?',
    a: 'Our office is in Anamnagar, Kathmandu (Ward No. 16). Scholarship programmes currently support partner schools in Palungtar Municipality, Gorkha — the home region of Late Tulasiman Shrestha.',
  },
  {
    q: 'Is the society officially registered?',
    a: 'Yes. It is registered under the Association Registration Act 2034 at the District Administration Office, Kathmandu (Reg. No. 652) and under the Social Welfare Act 2049 with the Social Welfare Council, Lainchaur (Reg. No. 47530).',
  },
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
