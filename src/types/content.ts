import type { IconName } from '@/lib/icons'

export interface NavContent {
  about: string
  openSource: string
  cases: string
  blog: string
  login: string
  contact: string
}

export interface FooterContent {
  terms: string
  termsLink: string
  privacy: string
  privacyLink: string
  rights: string
  created_by: string
  powered_by: string
}

export interface GlobalContent {
  nav: NavContent
  footer: FooterContent
}

export interface HeroStat {
  value: string
  label: string
}

export interface HeroContent {
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  stats: HeroStat[]
}

export interface PhilosophyItem {
  icon: IconName
  title: string
  description: string
}

export interface PhilosophyContent {
  label: string
  title: string
  intro: string
  items: PhilosophyItem[]
}

export interface ProjectItem {
  name: string
  role: string
  period: string
  description: string
  tags: string[]
  link: string | null
  type: 'client' | 'product' | 'opensource'
}

export interface ProjectsContent {
  label: string
  title: string
  items: ProjectItem[]
}

export interface StackGroup {
  label: string
  tags: string[]
  highlight?: boolean
}

export interface StackContent {
  label: string
  title: string
  groups: StackGroup[]
}

export interface CtaSectionContent {
  title: string
  button: string
}

export interface ProblemItem {
  title: string
  description: string
  icon: string
}

export interface ProblemContent {
  title: string
  subtitle: string
  items: ProblemItem[]
}

export interface PricingContent {
  label: string
  title: string
  subtitle: string
  currency: string
  price: string
  monthly: string
  monthlyLabel: string
  startingAt: string
  cta: string
  featuresCoreLabel: string
  featuresCore: string[]
  featuresAdvancedLabel: string
  featuresAdvanced: string[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ProcessContent {
  label: string
  title: string
  steps: ProcessStep[]
}

export interface AboutHeroContent {
  brow: string
  title: string
  subtitle: string
}

export interface AboutJourneyContent {
  title: string
  subtitle: string
  text1: string
  text2: string
}

export interface AboutPhilosophyContent {
  title: string
  subtitle: string
  text1: string
  text2: string
  text3: string
}

export interface AboutConnectContent {
  title: string
  text: string
}

export interface AboutMeContent {
  title: string
  hero: AboutHeroContent
  quote: string
  journey: AboutJourneyContent
  philosophy: AboutPhilosophyContent
  connect: AboutConnectContent
}

export interface BeyondContent {
  label: string
  title: string
  paragraphs: string[]
  location: string
  language: string
  workStyle: string
}

export interface BlogLabels {
  shareTitle: string
  readMore: string
  searchPlaceholder: string
  emptyStateTitle: string
  emptyStateText: string
  allCategories: string
}

export interface TaxonomyConfig {
  label: string
  slug: string
}

export interface TestimonialContent {
  quote: string
  author: string
  role: string
}

export interface MetadataContent {
  title: string
  description: string
}

export interface HomeLocaleContent {
  global: GlobalContent
  hero: HeroContent
  philosophy: PhilosophyContent
  projects: ProjectsContent
  stack: StackContent
  aboutMe: AboutMeContent
  beyond: BeyondContent
  blog: BlogLabels
  taxonomies: {
    category: TaxonomyConfig
    tag: TaxonomyConfig
  }
  testimonial: TestimonialContent
  metadata: MetadataContent
  ctaSection: CtaSectionContent
  problem: ProblemContent
  pricing: PricingContent
  process: ProcessContent
}
