export interface FacultyMember {
  slug: string
  name: string
  title: string
  department: string
  image: string
  bio: string[]
  education: string[]
  email?: string
}

export const faculty: FacultyMember[] = [
  {
    slug: 'dr-maria-santos',
    name: 'Dr. Maria Santos',
    title: 'Dean, College of Agriculture and Agri-Business',
    department: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: [
      'Dr. Maria Santos brings over 15 years of experience in agricultural education and research. She previously served as a professor at the University of Southern Mindanao and as a research consultant for the Department of Agriculture Region XII.',
      'Her research interests include sustainable farming systems, agri-entrepreneurship, and rural community development. She has published numerous papers on integrated pest management and organic agriculture in peer-reviewed journals.',
      'As the founding Dean of the College of Agriculture and Agri-Business at TCC, Dr. Santos is leading the development of the Agri-Business curriculum, establishing industry partnerships, and building the college\'s research and extension programs.',
    ],
    education: [
      'PhD in Agricultural Extension — University of the Philippines Los Baños',
      'MS in Agronomy — University of Southern Mindanao',
      'BS in Agriculture — Central Mindanao University',
    ],
    email: 'm.santos@tcc.edu.ph',
  },
  {
    slug: 'dr-carlo-reyes',
    name: 'Dr. Carlo Reyes',
    title: 'Dean, College of Arts and Sciences',
    department: 'Arts & Sciences',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: [
      'Dr. Carlo Reyes is an educator and administrator with extensive experience in higher education management. He has served as department chair and college secretary at various state universities and colleges in Mindanao.',
      'His academic background spans mathematics, statistics, and educational leadership. He is passionate about developing general education curricula that prepare students for the demands of the 21st-century workforce.',
      'Dr. Reyes is committed to fostering a culture of academic excellence and innovation at TCC, ensuring that students receive a well-rounded education grounded in critical thinking and ethical values.',
    ],
    education: [
      'EdD in Educational Leadership — Notre Dame University',
      'MS in Mathematics — Mindanao State University',
      'BS in Mathematics — Cotabato City State Polytechnic College',
    ],
    email: 'c.reyes@tcc.edu.ph',
  },
  {
    slug: 'prof-ana-villanueva',
    name: 'Prof. Ana Villanueva',
    title: 'Program Head, Agri-Business',
    department: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: [
      'Professor Ana Villanueva is the Program Head for the Bachelor of Science in Agri-Business at TCC. She has over a decade of experience in agri-business management and instruction.',
      'Before joining TCC, she worked as a business development officer for an agricultural cooperative in South Cotabato, where she helped local farmers access markets and financing. She also taught agri-business courses at a nearby state college.',
      'Her expertise includes agri-business planning, marketing of agricultural products, and financial management for small and medium agricultural enterprises.',
    ],
    education: [
      'MBA — University of the Philippines Mindanao',
      'BS in Agri-Business — University of Southern Mindanao',
    ],
    email: 'a.villanueva@tcc.edu.ph',
  },
  {
    slug: 'prof-jose-gonzales',
    name: 'Prof. Jose Gonzales',
    title: 'Program Head, Agricultural Technology',
    department: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: [
      'Professor Jose Gonzales leads the Agricultural Technology program at TCC. He is a licensed agricultural engineer with extensive field experience in farm mechanization, irrigation systems, and post-harvest technology.',
      'He previously served as a provincial agriculturist for the LGU of South Cotabato, where he implemented several farm-to-market road projects and irrigation infrastructure initiatives.',
      'At TCC, he is developing hands-on training programs that combine modern agricultural technology with traditional farming practices suitable for the Tampakan landscape.',
    ],
    education: [
      'MS in Agricultural Engineering — Central Luzon State University',
      'BS in Agricultural Engineering — University of Southern Mindanao',
    ],
    email: 'j.gonzales@tcc.edu.ph',
  },
  {
    slug: 'prof-luz-fernandez',
    name: 'Prof. Luz Fernandez',
    title: 'Program Head, Agri-Entrepreneurship',
    department: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
    bio: [
      'Professor Luz Fernandez brings a wealth of entrepreneurial experience to TCC. She founded and managed a successful organic farming enterprise in South Cotabato before transitioning to education.',
      'Her expertise lies in helping students develop the mindset and skills needed to launch and manage their own agricultural businesses. She is a strong advocate for youth entrepreneurship and has mentored dozens of young agri-entrepreneurs.',
      'She designed the Agri-Entrepreneurship curriculum to include practical modules on business planning, digital marketing for agricultural products, and value chain analysis.',
    ],
    education: [
      'MBA — University of the Philippines Diliman',
      'BS in Business Administration — Ateneo de Davao University',
    ],
    email: 'l.fernandez@tcc.edu.ph',
  },
  {
    slug: 'prof-ricardo-torres',
    name: 'Prof. Ricardo Torres',
    title: 'Professor, General Education',
    department: 'Arts & Sciences',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: [
      'Professor Ricardo Torres teaches general education courses at TCC, specializing in Filipino language, literature, and communication. He is known for his engaging teaching style and commitment to student development.',
      'He has received multiple teaching excellence awards and has developed instructional materials for Filipino language courses at the tertiary level. He also serves as an adviser for the TCC Culturals & Arts Guild.',
    ],
    education: [
      'MA in Filipino Language and Literature — Mindanao State University',
      'BA in Filipino — Cotabato City State Polytechnic College',
    ],
    email: 'r.torres@tcc.edu.ph',
  },
  {
    slug: 'dr-elena-cruz',
    name: 'Dr. Elena Cruz',
    title: 'Guidance Counselor & Student Affairs Coordinator',
    department: 'Student Services',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: [
      'Dr. Elena Cruz is the Guidance Counselor and Student Affairs Coordinator at TCC. She is a licensed guidance counselor with experience in both high school and college settings.',
      'She is passionate about student mental health and well-being, and has developed TCC\'s peer counseling program and wellness initiative. She also coordinates student organizations and co-curricular activities.',
    ],
    education: [
      'PhD in Guidance and Counseling — University of Santo Tomas',
      'MA in Guidance and Counseling — De La Salle University',
      'BS in Psychology — Ateneo de Davao University',
    ],
    email: 'e.cruz@tcc.edu.ph',
  },
]
