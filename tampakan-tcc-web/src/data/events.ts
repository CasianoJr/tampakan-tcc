export interface EventItem {
  slug: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  content: string[]
}

export const events: EventItem[] = [
  {
    slug: 'groundbreaking-ceremony-event',
    title: 'TCC Groundbreaking Ceremony',
    date: '2026-08-15',
    time: '9:00 AM – 11:00 AM',
    location: 'Former Koronadal Academy Site, Poblacion, Tampakan',
    description: 'Join us for the official groundbreaking ceremony marking the start of TCC construction.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    content: [
      'The municipal government of Tampakan, South Cotabato invites all residents, media, and stakeholders to the official groundbreaking ceremony of Tampakan Community College.',
      'The event will be led by Mayor Leonard T. Escobillo, together with municipal councilors, barangay officials, and representatives from the Department of Education and Commission on Higher Education.',
      'This momentous occasion marks the beginning of construction for the first-ever tertiary education institution in the municipality, fulfilling the LGU\'s promise of free, accessible higher education for every Tampakeño.',
      'Light refreshments will be served after the program. Residents from all 14 barangays are encouraged to attend and witness this historic milestone.',
    ],
  },
  {
    slug: 'community-consultation-forum',
    title: 'Community Consultation Forum',
    date: '2026-09-20',
    time: '1:00 PM – 4:00 PM',
    location: 'Tampakan Municipal Gymnasium',
    description: 'The LGU education task force presents TCC updates and gathers community input.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    content: [
      'The Tampakan Community College education task force will hold a community consultation forum at the municipal gymnasium to update residents on the college\'s progress and gather input.',
      'Topics to be discussed include the construction timeline, proposed academic programs, enrollment guidelines, and scholarship opportunities. An open forum will follow the presentation.',
      'The LGU encourages all Tampakeños — parents, out-of-school youth, high school seniors, and community leaders — to attend and share their thoughts on how TCC can best serve the community.',
    ],
  },
  {
    slug: 'agri-business-seminar',
    title: 'Agri-Business Career Orientation Seminar',
    date: '2026-10-12',
    time: '8:30 AM – 12:00 PM',
    location: 'Tampakan Municipal Hall — Session Hall',
    description: 'Learn about career opportunities in agri-business and the TCC flagship program.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    content: [
      'High school seniors and out-of-school youth are invited to a career orientation seminar focused on agri-business — the flagship program of Tampakan Community College.',
      'Speakers from the Department of Agriculture Region XII and successful local agri-entrepreneurs will share insights on career paths in agricultural business, from farm management to agri-technology.',
      'TCC education task force members will also present the proposed Agri-Business curriculum, admission requirements, and the free tuition program.',
      'Free dinner and certificates of participation will be provided. Pre-registration is required through the municipal education office.',
    ],
  },
  {
    slug: 'college-fair',
    title: 'TCC College Fair 2026',
    date: '2026-11-08',
    time: '9:00 AM – 5:00 PM',
    location: 'Tampakan Municipal Plaza',
    description: 'A one-day event showcasing TCC programs, pre-enrollment booths, and campus plans.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&q=80',
    content: [
      'The Tampakan Community College College Fair is a one-day event showcasing everything the future college has to offer. The fair will feature exhibit booths for each proposed program, a scale model of the campus, and a pre-enrollment registration area.',
      'Attendees can speak with TCC task force members, explore career pathways, and get answers to their questions about admissions, scholarships, and student life.',
      'The event will also feature a signing wall where residents can leave messages of support for the college, as well as a photo booth with TCC branding.',
      'Admission is free and open to all. Students from neighboring municipalities are also welcome to attend.',
    ],
  },
  {
    slug: 'year-end-community-report',
    title: 'TCC Year-End Community Report',
    date: '2026-12-19',
    time: '2:00 PM – 5:00 PM',
    location: 'Tampakan Municipal Gymnasium',
    description: 'Mayor Escobillo presents the year-end progress report on TCC\'s development.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    content: [
      'Mayor Leonard T. Escobillo will deliver the year-end community report on the progress of Tampakan Community College, covering construction milestones, program development, and plans for the coming year.',
      'The event will include a multimedia presentation with photos and videos of the construction progress, as well as testimonials from community members who have participated in consultations and pre-enrollment.',
      'After the report, attendees are invited to a community fellowship program with food and live performances from local artists.',
    ],
  },
  {
    slug: 'pre-enrollment-workshop',
    title: 'Pre-Enrollment Assistance Workshop',
    date: '2027-01-15',
    time: '9:00 AM – 3:00 PM',
    location: 'Tampakan Municipal Hall — Education Office',
    description: 'Get one-on-one assistance with your TCC pre-enrollment application.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    content: [
      'The TCC Admissions Office will hold a Pre-Enrollment Assistance Workshop for applicants who need help completing their online pre-enrollment forms.',
      'TCC staff will be on hand to guide applicants through each step of the pre-enrollment process, from creating an account to submitting required information. Laptops and internet access will be provided on-site.',
      'Applicants are encouraged to bring the following: PSA birth certificate, latest report card (if available), and valid ID. Walk-ins are welcome.',
    ],
  },
]
