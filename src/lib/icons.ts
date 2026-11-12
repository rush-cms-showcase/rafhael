import type { HeroIcon } from './home-sections'
import type { ContactKind } from './site-options'
import IconArrowRight from '~icons/lucide/arrow-right'
import IconCalendar from '~icons/lucide/calendar-days'
import IconCheck from '~icons/lucide/check'
import IconChevronDown from '~icons/lucide/chevron-down'
import IconChevronLeft from '~icons/lucide/chevron-left'
import IconChevronRight from '~icons/lucide/chevron-right'
import IconClock from '~icons/lucide/clock-9'
import IconCopy from '~icons/lucide/copy'
import IconExternalLink from '~icons/lucide/external-link'
import IconGithub from '~icons/lucide/github'
import IconGlobe from '~icons/lucide/globe'
import IconHouse from '~icons/lucide/house'
import IconMail from '~icons/lucide/mail'
import IconMapPin from '~icons/lucide/map-pin'
import IconMaximize from '~icons/lucide/maximize-2'
import IconMenu from '~icons/lucide/menu'
import IconPhone from '~icons/lucide/phone'
import IconSearch from '~icons/lucide/search'
import IconX from '~icons/lucide/x'
import IconLinkedin from '~icons/simple-icons/linkedin'
import IconWhatsapp from '~icons/simple-icons/whatsapp'
import IconWindows from '~icons/simple-icons/windows'
import IconTwitterX from '~icons/simple-icons/x'

export const Icons = {
	arrow_right: IconArrowRight,
	calendar: IconCalendar,
	check: IconCheck,
	chevron_down: IconChevronDown,
	chevron_left: IconChevronLeft,
	chevron_right: IconChevronRight,
	clock: IconClock,
	copy: IconCopy,
	external_link: IconExternalLink,
	github: IconGithub,
	globe: IconGlobe,
	house: IconHouse,
	linkedin: IconLinkedin,
	mail: IconMail,
	map_pin: IconMapPin,
	maximize: IconMaximize,
	menu: IconMenu,
	phone: IconPhone,
	search: IconSearch,
	twitter_x: IconTwitterX,
	whatsapp: IconWhatsapp,
	windows: IconWindows,
	x: IconX
} as const

export type IconName = keyof typeof Icons

export type IconComponent = (typeof Icons)[IconName]

export type LinkIcon = HeroIcon | ContactKind | 'windows'

export const LINK_ICONS: Record<LinkIcon, IconComponent> = {
	globe: Icons.globe,
	github: Icons.github,
	linkedin: Icons.linkedin,
	location: Icons.map_pin,
	envelope: Icons.mail,
	email: Icons.mail,
	whatsapp: Icons.whatsapp,
	phone: Icons.phone,
	windows: Icons.windows
}

export function linkIcon(name: string): IconComponent {
	return Object.hasOwn(LINK_ICONS, name) ? LINK_ICONS[name as LinkIcon] : Icons.external_link
}
