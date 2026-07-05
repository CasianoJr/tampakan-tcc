export interface DownloadItem {
  title: string
  description: string
  fileType: string
  fileSize: string
  category: string
}

export const downloads: DownloadItem[] = [
  {
    title: 'Pre-Enrollment Form',
    description: 'Printable pre-enrollment application form for offline submission.',
    fileType: 'PDF',
    fileSize: '245 KB',
    category: 'Admissions',
  },
  {
    title: 'Admission Requirements Checklist',
    description: 'Complete list of documents required for admission to TCC.',
    fileType: 'PDF',
    fileSize: '180 KB',
    category: 'Admissions',
  },
  {
    title: 'Scholarship Application Form',
    description: 'Application form for LGU-funded scholarship programs.',
    fileType: 'PDF',
    fileSize: '210 KB',
    category: 'Admissions',
  },
  {
    title: 'Student Handbook',
    description: 'Official student handbook containing rules, regulations, and campus policies.',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    category: 'Student Services',
  },
  {
    title: 'Parent Consent Form',
    description: 'Consent form for minor students for enrollment and school activities.',
    fileType: 'PDF',
    fileSize: '150 KB',
    category: 'Student Services',
  },
  {
    title: 'Medical Clearance Form',
    description: 'Medical certificate form to be accomplished by a licensed physician.',
    fileType: 'PDF',
    fileSize: '120 KB',
    category: 'Student Services',
  },
  {
    title: 'TCC Academic Calendar SY 2027-2028',
    description: 'Official academic calendar with important dates, holidays, and deadlines.',
    fileType: 'PDF',
    fileSize: '890 KB',
    category: 'Academic',
  },
  {
    title: 'Curriculum Guide — Agri-Business',
    description: 'Complete curriculum and course offering for the BS in Agri-Business program.',
    fileType: 'PDF',
    fileSize: '520 KB',
    category: 'Academic',
  },
  {
    title: 'Curriculum Guide — Agricultural Technology',
    description: 'Complete curriculum for the Agricultural Technology program.',
    fileType: 'PDF',
    fileSize: '480 KB',
    category: 'Academic',
  },
  {
    title: 'Faculty Evaluation Form',
    description: 'Anonymous faculty evaluation form for students.',
    fileType: 'PDF',
    fileSize: '95 KB',
    category: 'Academic',
  },
]
