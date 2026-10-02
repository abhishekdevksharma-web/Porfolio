export type ProjectCategory = 'Web' | 'Mobile' | 'Full-Stack'
export type ProjectType = 'Full-Stack' | 'Mobile'
export type ProjectPreviewType = 'quiz' | 'movie' | null

export type Project = {
  id: string
  title: string
  category: string
  shortDescription: string
  description: string
  technologies: string[]
  features: string[]
  image: string | null
  screenshots: string[]
  preview: ProjectPreviewType
  github: string | null
  apiGithub: string | null
  liveDemo: string | null
  type: ProjectType
  categories: ProjectCategory[]
  purpose: string
  workflow: string[]
  implementation: string[]
  challenges: string[]
}

export const projectFilters: Array<'All' | ProjectCategory> = [
  'All',
  'Web',
  'Mobile',
  'Full-Stack',
]

export const projects: Project[] = [
  {
    id: 'quiz-system',
    title: 'Quiz System',
    category: 'Full-Stack / Web',
    shortDescription:
      'A complete quiz management platform with separate admin and student workflows.',
    description:
      'A quiz platform that brings quiz authoring, student attempts, submissions, and results together in one responsive product. Separate admin and student workflows make the experience clear for both sides.',
    technologies: [
      'React',
      'Node.js',
      'NestJS',
      'MongoDB',
      'Mongoose',
      'Tailwind CSS',
      'REST API',
    ],
    features: [
      'Admin dashboard for quiz and question management',
      'Quiz creation and a structured quiz builder',
      'Student profiles and quiz history',
      'Timed quiz attempts and submissions',
      'Automatic response handling',
      'Results and student performance views',
      'REST API with MongoDB and Mongoose schemas',
      'Responsive React interface',
    ],
    image: null,
    screenshots: [],
    preview: 'quiz',
    github: 'https://github.com/abhishekdevksharma-web/quiz-system-ui-services',
    apiGithub: 'https://github.com/abhishekdevksharma-web/quiz-system-api-services',
    liveDemo: 'https://quiz-system-ui-services.onrender.com/',
    type: 'Full-Stack',
    categories: ['Web', 'Full-Stack'],
    purpose:
      'Make it straightforward for administrators to prepare and manage quizzes while giving students a focused way to take assessments and review their progress.',
    workflow: [
      'Admin creates a quiz',
      'Student takes a timed quiz',
      'Responses are submitted and recorded',
      'Results appear in quiz history',
    ],
    implementation: [
      'Designed separate admin and student experiences',
      'Built quiz authoring and question-management flows',
      'Connected React screens to REST API workflows',
      'Structured persistence around MongoDB and Mongoose',
      'Created responsive quiz and results interfaces',
    ],
    challenges: [
      'Keeping authoring and student-taking flows distinct while sharing quiz data',
      'Handling timed attempts and submissions consistently',
      'Presenting results and history clearly across screen sizes',
    ],
  },
  {
    id: 'moviehub',
    title: 'MovieHUB',
    category: 'Mobile Application',
    shortDescription:
      'A React Native mobile application focused on movie discovery and download management.',
    description:
      'A mobile entertainment application built with React Native and Expo. The project explores movie discovery, a multi-screen mobile experience, and the engineering behind managing downloads and local Android media.',
    technologies: [
      'React Native',
      'Expo',
      'Expo Router',
      'JavaScript',
      'Android',
      'File System',
      'Media Library',
      'Native Android APIs',
      'EAS Build',
    ],
    features: [
      'Movie-focused home, downloads, and settings screens',
      'Light and dark appearance modes',
      'WebView content integration',
      'Movie and episode content extraction workflow',
      'Download progress, speed, and estimated time remaining',
      'Pause, resume, restart, and delete download controls',
      'Local file and public media storage management',
      'Android media library and native intent integration',
    ],
    image: null,
    screenshots: [],
    preview: 'movie',
    github: null,
    apiGithub: null,
    liveDemo: 'https://movie-hub-y2q3.onrender.com/',
    type: 'Mobile',
    categories: ['Mobile'],
    purpose:
      'Explore what it takes to deliver more than a set of mobile screens: a complete user-facing experience that handles discovery, asynchronous downloads, and Android file interactions.',
    workflow: [
      'Browse content in the mobile interface',
      'Open content through the integrated WebView workflow',
      'Manage an asynchronous download',
      'Save and access media through Android storage',
    ],
    implementation: [
      'Built the application interface with React Native and Expo',
      'Organized navigation around Expo Router',
      'Integrated download controls and progress information',
      'Worked with local files and Android media storage',
      'Connected native Android intents to in-app workflows',
      'Prepared the Android build workflow with EAS',
    ],
    challenges: [
      'Coordinating asynchronous downloads with useful progress and ETA feedback',
      'Working with Android file access and public media storage',
      'Connecting WebView and native Android behaviors in a cohesive app',
    ],
  },
]

export function getProjectById(projectId: string | undefined) {
  return projects.find((project) => project.id === projectId)
}
