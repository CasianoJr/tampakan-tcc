export interface FaqItem {
  question: string
  answer: string
  category: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'When will Tampakan Community College open?',
    answer:
      'TCC is expected to open for School Year 2027–2028, pending completion of construction and CHED permit approval. The LGU is working to meet all requirements for the target opening date.',
    category: 'General',
  },
  {
    question: 'Is tuition really free?',
    answer:
      'Yes. Tampakan Community College is fully funded by the LGU of Tampakan, making it a tuition-free institution. Students only need to cover minimal miscellaneous fees, with subsidies available for qualified indigent students.',
    category: 'General',
  },
  {
    question: 'What programs will TCC offer?',
    answer:
      'TCC will initially offer programs focused on agriculture and agri-business, including: Agri-Business (flagship), Bachelor of Science in Agriculture, Agricultural Technology, and Agri-Entrepreneurship. Additional programs may be introduced in the future.',
    category: 'Academic',
  },
  {
    question: 'Who can enroll at TCC?',
    answer:
      'All high school graduates, out-of-school youth, and residents of Tampakan and neighboring municipalities are eligible to enroll. TCC is committed to inclusive education and welcomes applicants from all backgrounds.',
    category: 'Admissions',
  },
  {
    question: 'How do I pre-enroll?',
    answer:
      'You can pre-enroll online through the TCC website by filling out the pre-enrollment form. You may also visit the municipal hall\'s education office for assistance. A reference number will be issued upon successful submission.',
    category: 'Admissions',
  },
  {
    question: 'What are the admission requirements?',
    answer:
      'Requirements include: PSA birth certificate, Form 138 / Grade 12 Report Card, Certificate of Good Moral Character, 2×2 and 1×1 ID pictures, medical clearance, barangay clearance, and parent/guardian consent form for minors.',
    category: 'Admissions',
  },
  {
    question: 'Is there a placement exam?',
    answer:
      'Yes. TCC will administer a college entrance exam and placement test to assess applicants. Details on the exam schedule will be announced once the academic calendar is finalized.',
    category: 'Admissions',
  },
  {
    question: 'Does TCC offer scholarships?',
    answer:
      'Yes. In addition to the free tuition program, TCC offers merit scholarships, financial aid for indigent students, and other LGU-funded grant programs. The LGU is also exploring partnerships with CHED and TESDA for additional scholarship funding.',
    category: 'Financial',
  },
  {
    question: 'Where is TCC located?',
    answer:
      'TCC is located at the former Koronadal Academy site in Poblacion, Tampakan, South Cotabato. The 2.5-hectare lot is situated in the heart of the municipality, making it accessible to students from all barangays.',
    category: 'General',
  },
  {
    question: 'Will TCC have a dormitory?',
    answer:
      'A dormitory is part of the long-term campus development plan. In the meantime, the LGU is exploring transport assistance programs for students from remote barangays.',
    category: 'General',
  },
  {
    question: 'What student services will be available?',
    answer:
      'TCC will offer a full range of student services including: Guidance and Counseling, Library and Learning Resource Center, Health Services Clinic, Registrar\'s Office, Student Affairs Office, and Scholarship and Financial Assistance office.',
    category: 'Student Life',
  },
  {
    question: 'Can transferees from other schools apply?',
    answer:
      'Yes. TCC accepts transferees from other colleges and universities. Transferees must submit their transfer credentials, including honorable dismissal, and may be subject to credit evaluation.',
    category: 'Admissions',
  },
]
