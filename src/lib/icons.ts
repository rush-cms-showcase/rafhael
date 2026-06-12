import IconCalendar from '~icons/lucide/calendar-days'
import IconLineChart from '~icons/lucide/line-chart'
import IconShieldCheck from '~icons/lucide/shield-check'
import IconFileText from '~icons/lucide/file-text'
import IconPlugZap from '~icons/lucide/plug-zap'
import IconClock from '~icons/lucide/clock-9'
import IconHelpCircle from '~icons/lucide/help-circle'
import IconSettings from '~icons/lucide/settings'
import IconUser from '~icons/lucide/user'
import IconBell from '~icons/lucide/bell'
import IconStar from '~icons/lucide/star'
import IconGithub from '~icons/lucide/github'
import IconTerminal from '~icons/lucide/terminal'
import IconUsers from '~icons/lucide/users'
import IconMapPin from '~icons/lucide/map-pin'
import IconGlobe from '~icons/lucide/globe'
import IconMonitor from '~icons/lucide/monitor'
import IconExternalLink from '~icons/lucide/external-link'
import IconArrowRight from '~icons/lucide/arrow-right'
import IconTimer from '~icons/lucide/timer'
import IconEyeOff from '~icons/lucide/eye-off'
import IconPenTool from '~icons/lucide/pen-tool'
import IconZap from '~icons/lucide/zap'
import IconTrendingUp from '~icons/lucide/trending-up'
import IconTarget from '~icons/lucide/target'
import IconSmartphone from '~icons/lucide/smartphone'
import IconCheck from '~icons/lucide/check'
import IconGift from '~icons/lucide/gift'
import IconChevronDown from '~icons/lucide/chevron-down'
import IconChevronLeft from '~icons/lucide/chevron-left'
import IconChevronRight from '~icons/lucide/chevron-right'
import IconSearch from '~icons/lucide/search'
import IconX from '~icons/lucide/x'
import IconMenu from '~icons/lucide/menu'
import IconMail from '~icons/lucide/mail'
import IconPhone from '~icons/lucide/phone'
import IconMessageCircle from '~icons/lucide/message-circle'
import IconSend from '~icons/lucide/send'
import IconCopy from '~icons/lucide/copy'
import IconImage from '~icons/lucide/image'
import IconTriangle from '~icons/lucide/triangle'
import IconLinkedin from '~icons/simple-icons/linkedin'
import IconWhatsapp from '~icons/simple-icons/whatsapp'
import IconTelegram from '~icons/simple-icons/telegram'
import IconTwitterX from '~icons/simple-icons/x'
import IconBookOpen from '~icons/lucide/book-open'
import IconSquareCheck from '~icons/lucide/square-check'
import IconQuote from '~icons/lucide/quote'
import IconInfo from '~icons/lucide/info'
import IconMeta from '~icons/simple-icons/meta'
import IconGoogle from '~icons/simple-icons/google'
import IconAnthropic from '~icons/simple-icons/anthropic'
import IconOpenAI from '~icons/simple-icons/openai'
import IconAWS from '~icons/simple-icons/amazonaws'
import IconCloudflare from '~icons/simple-icons/cloudflare'
import IconSentry from '~icons/simple-icons/sentry'
import IconBot from '~icons/lucide/bot'
import IconBox from '~icons/lucide/box'
import IconLaravel from '~icons/simple-icons/laravel'
import IconPhp from '~icons/simple-icons/php'
import IconReact from '~icons/simple-icons/react'
import IconSvelte from '~icons/simple-icons/svelte'
import IconGo from '~icons/simple-icons/go'
import IconRust from '~icons/simple-icons/rust'
import IconMysql from '~icons/simple-icons/mysql'
import IconPostgresql from '~icons/simple-icons/postgresql'
import IconPython from '~icons/simple-icons/python'
import IconAstro from '~icons/simple-icons/astro'
import IconFilament from '~icons/simple-icons/filament'

export const Icons = {
	calendar: IconCalendar,
	chart: IconLineChart,
	shield: IconShieldCheck,
	file: IconFileText,
	plug: IconPlugZap,
	clock: IconClock,
	help: IconHelpCircle,
	settings: IconSettings,
	user: IconUser,
	bell: IconBell,
	star: IconStar,
	github: IconGithub,
	terminal: IconTerminal,
	users: IconUsers,
	map_pin: IconMapPin,
	globe: IconGlobe,
	monitor: IconMonitor,
	external_link: IconExternalLink,
	arrow_right: IconArrowRight,
	timer: IconTimer,
	eye_off: IconEyeOff,
	pen_tool: IconPenTool,
	zap: IconZap,
	trending_up: IconTrendingUp,
	target: IconTarget,
	smartphone: IconSmartphone,
	check: IconCheck,
	gift: IconGift,
	chevron_down: IconChevronDown,
	chevron_left: IconChevronLeft,
	chevron_right: IconChevronRight,
	search: IconSearch,
	x: IconX,
	menu: IconMenu,
	mail: IconMail,
	phone: IconPhone,
	message_circle: IconMessageCircle,
	send: IconSend,
	copy: IconCopy,
	image: IconImage,
	triangle: IconTriangle,
	linkedin: IconLinkedin,
	whatsapp: IconWhatsapp,
	telegram: IconTelegram,
	twitter_x: IconTwitterX,
	quality: IconStar,
	ownership: IconShieldCheck,
	team: IconUsers,
	invisible: IconEyeOff,
	design: IconPenTool,
	lightning: IconZap,
	mobile: IconSmartphone,
	book: IconBookOpen,
	square_check: IconSquareCheck,
	quote: IconQuote,
	info: IconInfo,
	meta: IconMeta,
	google: IconGoogle,
	anthropic: IconAnthropic,
	openai: IconOpenAI,
	aws: IconAWS,
	cloudflare: IconCloudflare,
	sentry: IconSentry,
	bot: IconBot,
	box: IconBox,
	laravel: IconLaravel,
	php: IconPhp,
	react: IconReact,
	svelte: IconSvelte,
	golang: IconGo,
	rust: IconRust,
	mysql: IconMysql,
	postgresql: IconPostgresql,
	python: IconPython,
	astro: IconAstro,
	filamentphp: IconFilament,
} as const

export type IconName = keyof typeof Icons
