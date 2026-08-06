const BASE = import.meta.env.BASE_URL;

export const LOGO_URL = BASE + 'logo/' + encodeURIComponent('Screenshot 2026-08-06 at 16.58.53.png');

export const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'members', label: 'Members' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const testimonialFile = (name) => BASE + 'testimonial/' + encodeURIComponent(name);

export const GALLERY = [
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.16.24 PM.jpeg'),
    caption: 'Scholarship distribution day — smiles that say everything',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.16.24 PM(1).jpeg'),
    caption: 'Our scholars receiving their annual stationery support',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.17.57 PM.jpeg'),
    caption: 'Community health camp organised for student families',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.18.14 PM.jpeg'),
    caption: 'A classroom in session at one of our partner schools',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.18.52 PM.jpeg'),
    caption: 'Uniform handover before the new academic session',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.36.09 PM.jpeg'),
    caption: 'Volunteers and guardians at our annual gathering',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.36.30 PM.jpeg'),
    caption: 'Felicitating meritorious students from humble homes',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.36.46 PM.jpeg'),
    caption: 'Moments from our education awareness programme',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.37.30 PM.jpeg'),
    caption: 'Young dreamers, bright futures — our scholarship batch',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.37.47 PM.jpeg'),
    caption: 'Books, bags and blessings for the new school year',
  },
  {
    src: testimonialFile('WhatsApp Image 2026-07-11 at 6.38.03 PM.jpeg'),
    caption: 'Together we rise — a day with the TSMS family',
  },
];

export const PROGRAMS = [
  {
    np: 'निःशुल्क शिक्षा',
    title: 'Free Education',
    text: 'Full scholarships covering tuition, textbooks, uniforms and examination fees for students from low-income families, from primary school through higher secondary.',
    icon: 'book',
  },
  {
    np: 'स्वास्थ्य सेवा',
    title: 'Healthcare Support',
    text: 'Regular health check-ups, medicine support and annual community health camps so that illness never becomes the reason a child leaves school.',
    icon: 'heart',
  },
  {
    np: 'छात्रवृत्ति कार्यक्रम',
    title: 'Scholarship Programme',
    text: 'Merit and need-based scholarships awarded every year, with mentorship that walks beside each student until they stand on their own feet.',
    icon: 'award',
  },
  {
    np: 'शैक्षिक सामग्री',
    title: 'Learning Materials',
    text: 'Distribution of school bags, stationery, and library resources to community schools in underserved neighbourhoods of the valley.',
    icon: 'pencil',
  },
  {
    np: 'अभिभावक परामर्श',
    title: 'Family Counselling',
    text: 'Guidance sessions for parents and guardians on the value of education, child wellbeing and keeping girls in school.',
    icon: 'users',
  },
  {
    np: 'सीप विकास',
    title: 'Skill Development',
    text: 'Weekend workshops in computer literacy, arts and vocational skills that open doors beyond the classroom for senior students.',
    icon: 'lamp',
  },
];

export const VOICES = [
  {
    quote:
      'When my father fell ill, I thought my books would be replaced by work. This society paid my fees for three years. Today I am studying to be a nurse.',
    name: 'Sita Tamang',
    role: 'Scholarship Student, Grade 12',
  },
  {
    quote:
      'They did not just give my son a uniform and books. They gave our whole family the courage to dream bigger than our circumstances.',
    name: 'Bishnu Maya Gurung',
    role: 'Parent of a Scholar',
  },
  {
    quote:
      'I volunteer at every health camp. Watching children receive care they could never afford reminds me why this society exists — seva above all.',
    name: 'Dr. Ramesh Adhikari',
    role: 'Volunteer Physician',
  },
];

export const FAQS = [
  {
    q: 'What is the Tulasiman Shrestha Memorial Society?',
    a: 'We are a non-profit, non-political social organisation established in 2017 in loving memory of the late Tulasiman Shrestha. Our sole purpose is to support underprivileged students in Nepal through free education, healthcare, scholarships and learning materials.',
  },
  {
    q: 'Who is eligible for the scholarship programme?',
    a: 'Any student enrolled in a community (public) school whose family income falls below the poverty threshold may apply. Priority is given to orphaned children, single-parent households, girls at risk of dropping out, and students with demonstrated academic promise.',
  },
  {
    q: 'How can I apply for support for my child?',
    a: 'Visit our office during working hours with your child\'s school recommendation letter, a copy of the birth certificate or citizenship, and a brief income statement from your ward office. Our team reviews applications every year before the new academic session begins in Baisakh.',
  },
  {
    q: 'How is the society funded?',
    a: 'We are funded entirely by membership contributions, individual donors, and small grants from well-wishers within Nepal and the Nepali diaspora abroad. Every rupee received is accounted for in our annual general meeting and published financial report.',
  },
  {
    q: 'Can I donate or sponsor a student?',
    a: 'Yes. You may make a one-time donation or sponsor a student\'s full education for a year. Sponsors receive a yearly progress report of the student they support. Please reach us through the contact page and we will share the details.',
  },
  {
    q: 'Do you accept volunteers?',
    a: 'Warmly. We welcome teachers, doctors, students and professionals who wish to contribute time — at health camps, material distribution days, tutoring sessions and awareness programmes. Fill in the contact form and mention "volunteer" in your message.',
  },
  {
    q: 'Where does the society operate?',
    a: 'Our office is based in Kathmandu, and our programmes currently reach community schools across the Kathmandu Valley, with plans to extend support to rural districts in the coming years.',
  },
  {
    q: 'Is my donation tax-deductible and transparent?',
    a: 'The society is registered with the District Administration Office and affiliated with the Social Welfare Council of Nepal. All donations are receipted, and audited statements are shared with members and donors annually.',
  },
];

export const MEMBER_TIERS = [
  {
    tier: 'Executive Committee',
    np: 'कार्यसमिति',
    members: [
      { name: 'Dr. Kamal Shrestha', np: 'अध्यक्ष', role: 'President' },
      { name: 'Mrs. Sunita Manandhar', np: 'उपाध्यक्ष', role: 'Vice-President' },
      { name: 'Mr. Rajan Bahadur KC', np: 'महासचिव', role: 'General Secretary' },
      { name: 'Ms. Prabha Tuladhar', np: 'सचिव', role: 'Secretary' },
      { name: 'Mr. Dipak Raj Joshi', np: 'कोषाध्यक्ष', role: 'Treasurer' },
      { name: 'Mrs. Mina Gurung', np: 'सह-कोषाध्यक्ष', role: 'Joint Treasurer' },
    ],
  },
  {
    tier: 'Advisory Board',
    np: 'सल्लाहकार समिति',
    members: [
      { name: 'Prof. Bhekh Bahadur Thapa', np: 'प्रमुख सल्लाहकार', role: 'Chief Advisor' },
      { name: 'Mrs. Laxmi Devi Pandey', np: 'सल्लाहकार', role: 'Advisor' },
      { name: 'Mr. Hari Prasad Sharma', np: 'सल्लाहकार', role: 'Advisor' },
    ],
  },
  {
    tier: 'General Members',
    np: 'सदस्यहरू',
    members: [
      { name: 'Mr. Nabin Kumar Basnet', np: 'सदस्य', role: 'Member' },
      { name: 'Ms. Asmita Rana', np: 'सदस्य', role: 'Member' },
      { name: 'Mr. Suresh Lama', np: 'सदस्य', role: 'Member' },
      { name: 'Mrs. Gita Maharjan', np: 'सदस्य', role: 'Member' },
    ],
  },
];

export const CONTACT = {
  address: 'Mid-Baneshwor, Kathmandu 44600, Nepal',
  phone: '+977-1-4578901',
  mobile: '+977-9841234567',
  email: 'info@tsmsociety.org.np',
  hours: 'Sunday – Friday, 10:00 AM – 5:00 PM',
  mapEmbed:
    'https://maps.google.com/maps?q=Baneshwor,%20Kathmandu,%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed',
};
