export interface Organization {
  name: string
  acronym: string
  description: string
  focus: string
}

export interface Service {
  title: string
  description: string
  icon: string
  availability: string
}

export const organizations: Organization[] = [
  {
    name: 'TCC Student Government',
    acronym: 'TCC-SG',
    description:
      'The highest governing body of the student population, representing the interests of all TCC students in academic, administrative, and extracurricular matters.',
    focus: 'Student representation, campus events, policy advocacy',
  },
  {
    name: 'Agri-Business Society',
    acronym: 'ABS',
    description:
      'A professional organization for students enrolled in the Agri-Business program, focused on agri-entrepreneurship, farm tours, and industry linkages.',
    focus: 'Agricultural entrepreneurship, industry exposure, skills training',
  },
  {
    name: 'Junior Agriculturists Association',
    acronym: 'JAA',
    description:
      'An academic organization for Bachelor of Science in Agriculture students that promotes sustainable farming practices and agricultural research.',
    focus: 'Sustainable agriculture, research, community extension',
  },
  {
    name: 'TCC Culturals & Arts Guild',
    acronym: 'TCC-CAG',
    description:
      'A cultural organization that promotes the arts through theater, music, visual arts, and cultural presentations celebrating Tampakan heritage.',
    focus: 'Performing arts, cultural preservation, creative expression',
  },
  {
    name: 'TCC Green Campus Initiative',
    acronym: 'TCC-GCI',
    description:
      'An environmental organization dedicated to waste management, tree planting, and sustainability campaigns within the campus and the wider Tampakan community.',
    focus: 'Environmental advocacy, sustainability, community clean-ups',
  },
  {
    name: 'TCC Sports Federation',
    acronym: 'TCC-SF',
    description:
      'The umbrella organization for all varsity sports teams, intramurals, and recreational sports programs at Tampakan Community College.',
    focus: 'Athletics, inter-school competitions, fitness programs',
  },
  {
    name: 'TCC Peer Counselors Guild',
    acronym: 'TCC-PCG',
    description:
      'A student-led organization that provides peer-to-peer mental health support, academic counseling referrals, and wellness awareness campaigns.',
    focus: 'Mental health, peer support, wellness advocacy',
  },
]

export const services: Service[] = [
  {
    title: 'Guidance and Counseling Office',
    description:
      'Provides personal, academic, and career counseling services to all TCC students. The office also administers personality and aptitude assessments and conducts wellness seminars.',
    icon: 'Heart',
    availability: 'Monday–Friday, 8:00 AM – 5:00 PM',
  },
  {
    title: 'Library and Learning Resource Center',
    description:
      'Houses the college\'s collection of books, journals, and digital resources. The center offers study areas, computer terminals, and research assistance for students and faculty.',
    icon: 'BookOpen',
    availability: 'Monday–Friday, 7:00 AM – 7:00 PM; Saturday, 8:00 AM – 12:00 PM',
  },
  {
    title: 'Health Services Clinic',
    description:
      'Offers basic medical consultations, first aid, and health education services. The clinic also coordinates with the Tampakan Municipal Health Office for referrals and immunization programs.',
    icon: 'Stethoscope',
    availability: 'Monday–Friday, 8:00 AM – 5:00 PM',
  },
  {
    title: 'Scholarships and Financial Assistance',
    description:
      'Administers all LGU-funded and externally funded scholarship programs, including the TCC Free Tuition Program, merit scholarships, and financial aid for indigent students.',
    icon: 'GraduationCap',
    availability: 'Monday–Friday, 8:00 AM – 5:00 PM (by appointment)',
  },
  {
    title: 'Registrar\'s Office',
    description:
      'Manages student records, enrollment, class schedules, grades, and transcript requests. The office also processes cross-enrollment and transfer credentials.',
    icon: 'FileText',
    availability: 'Monday–Friday, 8:00 AM – 5:00 PM',
  },
  {
    title: 'Student Affairs Office',
    description:
      'Oversees student organizations, co-curricular activities, discipline, and student welfare programs. Serves as the liaison between the administration and the student body.',
    icon: 'Users',
    availability: 'Monday–Friday, 8:00 AM – 5:00 PM',
  },
  {
    title: 'Guidance and Testing Center',
    description:
      'Administer college entrance exams, placement tests, and other standardized assessments. Also provides test preparation resources and academic intervention programs.',
    icon: 'ClipboardList',
    availability: 'Monday–Friday, 8:00 AM – 5:00 PM (testing by schedule)',
  },
]
