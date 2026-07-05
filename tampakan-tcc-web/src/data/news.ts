export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  content: string[]
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'groundbreaking-ceremony',
    title: 'Groundbreaking Ceremony Marks Start of TCC Construction',
    excerpt:
      'LGU Tampakan officials, led by Mayor Leonard T. Escobillo, break ground on the former Koronadal Academy site.',
    date: '2026-06-15',
    author: 'TCC Information Office',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    content: [
      'The LGU of Tampakan formally commenced construction of Tampakan Community College with a groundbreaking ceremony held at the former Koronadal Academy site in Poblacion, Tampakan, South Cotabato.',
      'Mayor Leonard T. Escobillo led the event alongside municipal councilors, barangay captains, Department of Education representatives, and members of the community. The ceremony symbolized the LGU\'s firm commitment to bringing free, accessible higher education to every Tampakeño.',
      '"This is more than a building — it is a promise to our youth and to the future of Tampakan," said Mayor Escobillo during his remarks. "Every Tampakeño deserves the opportunity to pursue a college education without leaving their hometown."',
      'The college will rise on a 2.5-hectare lot and is expected to be completed within the 2026–2028 construction window. The first phase includes academic buildings, a library, and administrative offices.',
    ],
  },
  {
    slug: 'agri-business-as-flagship-program',
    title: 'Agri-Business Program Approved as TCC Flagship Course',
    excerpt:
      'The LGU education task force has approved Agri-Business as the flagship program of TCC, aligning with the agricultural economy of Tampakan.',
    date: '2026-05-20',
    author: 'TCC Information Office',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    content: [
      'The Tampakan Community College education task force has officially approved the Bachelor of Science in Agri-Business as the institution\'s flagship program, reflecting the municipality\'s strong agricultural heritage and economic priorities.',
      'Tampakan is home to a thriving agricultural sector, with corn, rice, coconut, and high-value crops as primary products. The Agri-Business program is designed to equip students with the skills needed to manage agricultural enterprises, engage in agri-entrepreneurship, and contribute to the local economy.',
      'In addition to Agri-Business, the college plans to offer complementary programs in agricultural technology and agri-entrepreneurship, creating a comprehensive agricultural education track.',
      'The task force is currently consulting with the Commission on Higher Education (CHED) to ensure the curriculum meets national standards.',
    ],
  },
  {
    slug: 'community-consultation-held',
    title: 'Community Consultation Draws Hundreds of Tampakeños',
    excerpt:
      'Over 500 residents attended the first community consultation on TCC\'s programs, enrollment process, and construction timeline.',
    date: '2026-04-10',
    author: 'TCC Information Office',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    content: [
      'Hundreds of Tampakeños from all 14 barangays gathered at the municipal gymnasium for the first major community consultation on the establishment of Tampakan Community College.',
      'The event gave residents the opportunity to voice their opinions on the proposed academic programs, ask questions about the enrollment process, and provide input on the construction timeline. Key concerns raised included transportation access for students from remote barangays, dormitory facilities, and the range of programs to be offered.',
      'The LGU education task force addressed these concerns, noting that a transport assistance program and dormitory are part of the long-term campus development plan.',
      '"We want TCC to be shaped by the people it will serve," said Mayor Escobillo. "Every question and suggestion brought up today will be considered as we move forward."',
    ],
  },
  {
    slug: 'free-tuition-confirmed',
    title: 'TCC to Offer Free Tuition for All Enrolled Students',
    excerpt:
      'In line with the LGU\'s commitment, Tampakan Community College will provide free tuition to all enrolled students starting from its opening.',
    date: '2026-03-05',
    author: 'Mayor\'s Office',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&q=80',
    content: [
      'The municipal government of Tampakan has affirmed that Tampakan Community College will be fully funded by the LGU, ensuring that all enrolled students pay zero tuition fees.',
      'The free tuition initiative covers all academic programs offered by TCC, including the flagship Agri-Business course. Students will only need to cover minimal miscellaneous fees, with subsidies available for qualified indigent students.',
      '"Education should never be a privilege of the few," said Mayor Leonard T. Escobillo. "TCC will be a tuition-free institution, period."',
      'The LGU is also exploring partnerships with national agencies such as CHED and TESDA to secure additional funding for scholarships, laboratory equipment, and faculty development.',
    ],
  },
  {
    slug: 'partnership-with-da',
    title: 'TCC Partners with Department of Agriculture for Extension Programs',
    excerpt:
      'A new partnership with the DA will bring agricultural extension programs, training, and demonstrations to TCC students and local farmers.',
    date: '2026-02-12',
    author: 'TCC Information Office',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    content: [
      'Tampakan Community College has entered into a memorandum of agreement with the Department of Agriculture (DA) Region XII to establish an agricultural extension program that will benefit both students and the wider farming community.',
      'Under the agreement, DA technical experts will conduct regular training sessions and demonstrations on modern farming techniques, pest management, and sustainable agricultural practices. TCC students will have the opportunity to participate in hands-on learning activities alongside local farmers.',
      'The partnership also opens the door for research collaboration, with TCC serving as a testing ground for DA-recommended crop varieties and farming technologies suited to Tampakan\'s climate and soil conditions.',
      'Governor and municipal agricultural officers have expressed support for the initiative, noting that it aligns with the province\'s goal of modernizing the agricultural sector.',
    ],
  },
  {
    slug: 'pre-enrollment-opens',
    title: 'Pre-Enrollment Portal Now Open for SY 2027–2028',
    excerpt:
      'Aspiring Tampakeño college students can now pre-enroll online through the TCC pre-enrollment portal.',
    date: '2026-01-20',
    author: 'TCC Admissions Office',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    content: [
      'The pre-enrollment portal for Tampakan Community College is now open, allowing incoming college students to reserve their slots ahead of the anticipated opening for School Year 2027–2028.',
      'The online pre-enrollment form is available to all high school graduates, out-of-school youth, and residents of Tampakan and neighboring municipalities. Applicants will need to provide basic personal information, academic background, and their preferred program.',
      'Pre-enrollment does not constitute final admission but guarantees the applicant a place in the priority evaluation process once formal admissions begin. A reference number is issued upon submission, which applicants can use to track their status.',
      'To pre-enroll, visit the official TCC website and navigate to the Pre-Enrollment page. For assistance, residents can also visit the municipal hall\'s education office.',
    ],
  },
]
