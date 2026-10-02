export const contactEmail = 'abhishek.dev.k.sharma@gmail.com'
const emailLink = `mailto:${contactEmail}`
export const githubProfileUrl = 'https://github.com/abhishekdevksharma-web'

export const socialLinks = [
  { label: 'GitHub', href: githubProfileUrl, icon: 'github' },
  { label: 'LinkedIn', href: null, icon: 'linkedin' },
  { label: 'Email', href: emailLink, icon: 'mail' },
] as const

export const resumeUrl: string | null = '/resume/Abhishek-Sharma-Resume.pdf'
