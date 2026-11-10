import IconArrowLeft from '~icons/lucide/arrow-left'
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
import IconMail from '~icons/lucide/mail'
import IconMenu from '~icons/lucide/menu'
import IconMessageCircle from '~icons/lucide/message-circle'
import IconSearch from '~icons/lucide/search'
import IconX from '~icons/lucide/x'
import IconLinkedin from '~icons/simple-icons/linkedin'
import IconTelegram from '~icons/simple-icons/telegram'
import IconWhatsapp from '~icons/simple-icons/whatsapp'
import IconTwitterX from '~icons/simple-icons/x'

export const Icons = {
	arrow_left: IconArrowLeft,
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
	linkedin: IconLinkedin,
	mail: IconMail,
	menu: IconMenu,
	message_circle: IconMessageCircle,
	search: IconSearch,
	telegram: IconTelegram,
	twitter_x: IconTwitterX,
	whatsapp: IconWhatsapp,
	x: IconX
} as const

export type IconName = keyof typeof Icons
