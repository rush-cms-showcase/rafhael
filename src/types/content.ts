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

export interface HeroCodeSnippet {
    className: string
    role: string
    roleComment: string
    stack: string[]
    exp: string
    open: boolean
    openComment: string
}

export interface HeroContent {
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    stats: HeroStat[]
    codeSnippet: HeroCodeSnippet
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

export interface CtaSectionContent {
    title: string
    button: string
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

export interface LatestPostsContent {
    title: string
    viewAll: string
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
    aboutMe: AboutMeContent
    beyond: BeyondContent
    blog: BlogLabels
    taxonomies: {
        category: TaxonomyConfig
        tag: TaxonomyConfig
    }
    latestPosts: LatestPostsContent
    testimonial: TestimonialContent
    metadata: MetadataContent
    ctaSection: CtaSectionContent
}
