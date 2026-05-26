import type { DynamicPageContent } from '@/types/blocks'

export const meisterfyContent: DynamicPageContent = {
	en: {
		page: {
			title: 'Meisterfy',
			description: 'The full marketing platform your AI agent can actually use.',
			og_banner: {
				logo: '/images/open-source/meisterfy-logo.webp',
				title: 'MEISTERFY',
				subtitle: 'The Complete Open-source Marketing Platform'
			}
		},
		blocks: [
			{
				_type: 'hero',
				data: {
					headline: 'MEISTERFY',
					tagline: 'Open-source platform for agencies to manage Social Media, Google Ads, and AI content generation.',
					actions: [
						{ label: 'View on GitHub', url: 'https://github.com/meisterfy/meisterfy', variant: 'primary' },
						{ label: 'Documentation', url: 'https://github.com/meisterfy/docs', variant: 'secondary' },
					],
					logo: '/images/open-source/meisterfy-logo.webp'
				}
			},
			{
				_type: 'story',
				data: {
					title: "Meister... What??",
					hook: "Almost all agencies I've worked with runs the same chaotic stack: Some SaaS for scheduling, Google Ads console for campaigns, ChatGPT in a separate tab for content ideas, and a spreadsheet somewhere to tie it all together. None of it talks to each other or remembers your client's brand voice.",
					callout: "Maesterfy is here to stop the copy-paste between tools, in one place you have the whole marketing stack."
				}
			},
			{
				_type: 'modules',
				data: {
					items: [
						{
							title: 'Social Media',
							url: 'https://your-site.com/your-tenant/social',
							image: '/images/open-source/meisterfy/social-media-module.webp',
							description: 'A visual calendar for planning, approving, and publishing posts across Facebook and Instagram. Use your preferred AI provider to create posts Drafts and brainstorm.',
							bullets: [
								'Approval workflow with Role Based Access Control',
								'Native Meta publishing via OAuth2',
								'AI agnostic with the same brand identity baked in',
								'Media storage on S3 or Cloudflare R2',
							]
						},
						{
							title: 'Google Ads',
							url: 'https://your-site.com/your-tenant/ads/google',
							image: '/images/open-source/meisterfy/google-ads-module.webp',
							description: 'Monitoring and manage your Campaigns, Groups, Search Terms and Bidding Criteria. Mix real-time data and local storage for better reports and AI-ready data structure.',
							bullets: [
								'180 days optional metric retention for richer reports and faster queries',
								'AI Chat tool to get real-time insights',
								'Automated Report Generation, with optional AI-generated insights in every report',
								'Manage all your campaigns directly inside platform',
							]
						},
						{
							title: 'Plug & Play',
							url: 'https://your-site.com/settings/connections',
							image: '/images/open-source/meisterfy/settings-connections.webp',
							description: 'Connect your favorite tools with a few clicks and assign directly to your client. The connection system was designed to support a lot of new connections in the future.',
							bullets: [
								'Real plug and play experience',
								'Use the same connection with more than one client',
								'Your keys, your data. Never shared',
								'Ready for new connections',
							]
						},
						{
							title: 'AI Content & Reports',
							image: '/images/open-source/meisterfy/google-ads-module-2.webp',
							description: 'Generate content with your client\'s actual brand identity: primary persona, brand tone, custom AI instructions, and default hashtags baked in. Use AI to get reports based on real metrics and personality.',
							bullets: [
								'Real-time AI chat tool about your client',
								'Per-tenant brand identity (persona, tone, hashtags, niche, language)',
								'Batch AI generated social media posts',
								'Generate and schedule AI reports',
							]
						},
						{
							title: 'Native MCP Server',
							url: 'https://your-site.com/your-tenant/settings/mcp',
							image: '/images/open-source/meisterfy/settings-mcp.webp',
							description: 'Meisterfy ships with a built-in Model Context Protocol server! External AI agents, like Claude, ChatGPT, Gemini, Kimi, DeepSeek, Perplexity or any MCP-compatible client (and ide) can authenticate with a scoped API key and interact with your marketing data programmatically.',
							bullets: [
								'MCP is a agnostic protocol and global standard',
								'Agents can extract reports, diagnose campaign anomalies, and adjust budgets',
								'API keys are scoped (readonly, editor or admin)',
								'Keys are generated and revoked directly from the tenant settings UI',
							],
							callout: "Your AI agent can say: 'I noticed this keyword is spending too much and not converting - add it as a negative?' And it can actually do it. Not just suggest it."
						},
					]
				}
			},
			{
				_type: 'integrations',
				data: {
					heading: 'Connect What You Already Use',
					items: [
						{ name: 'Meta', logo: '/connectors/meta.svg' },
						{ name: 'Google Ads', logo: '/connectors/googleads.svg' },
						{ name: 'Claude', logo: '/connectors/anthropic.svg' },
						{ name: 'ChatGPT', logo: '/connectors/openai.svg' },
						{ name: 'Gemini', logo: '/connectors/gemini.svg' },
						{ name: 'Kimi', logo: '/connectors/kimi.svg' },
						{ name: 'Groq', logo: '/connectors/groq.svg' },
						{ name: 'AWS S3', logo: '/connectors/s3.svg' },
						{ name: 'Cloudflare R2', logo: '/connectors/r2.svg' },
						{ name: 'Resend', logo: '/connectors/resend.svg' },
						{ name: 'Brevo', logo: '/connectors/brevo.svg' },
						{ name: 'Sentry', logo: '/connectors/sentry.svg' }
					],
				}
			},
			{
				_type: 'stats',
				data: {
					heading: 'Built to Last. Not to Impress.',
					stats: [
						{ stat: '85%+', label: 'Integration test coverage in repository layer' },
						{ stat: '260+', label: 'Frontend tests using Vitest unit + Playwright component. With e2e Playwright flows covering auth, protected routes, and post creation' },
						{ stat: 'CI', label: 'Complete pipeline covering lint, build, vet, unit, integration, eslint, prettier, typescript, security scan, frontend, localization, smoke' },
						{ stat: 'AGPL-3.0', label: 'Fully open source, forever.' }
					],
					faqs: [
						{ question: 'Is it actually open source?', answer: 'Yes, fully open source under the AGPL-3.0 license. You can view, fork, and self-host the entire codebase.' },
						{ question: 'Who pays for the AI calls?', answer: 'You bring your own API keys (BYOK) for the AI models you use, so you have full control over your usage and costs.' },
						{ question: 'Do I have Meta and Google verified in my app?', answer: 'Yes! You will need to use your own Meta and Google developer accounts and complete their verification processes if required for your specific use cases. However, the app is already configured to use your keys.' },
						{ question: 'Will the MCP server work with my LLM?', answer: 'Yes, our MCP server uses standard protocols that are compatible with major LLMs like Claude, ChatGPT, Gemini, and others.' },
						{ question: 'When does the alpha launch?', answer: 'The alpha is currently in active development. Stay tuned for updates on our launch schedule.' },
						{ question: 'When does the cloud launch?', answer: 'The priority now is ensure the release of alpha and beta, adjust and fix everything possible, then we will start to build the cloud version. The open-source app will be the same, with no vendor-lock.' },
						{ question: 'What if I just use it for one client?', answer: 'That\'s perfectly fine! The platform is designed to scale from a single client to large agencies.' },
						{ question: 'Why AGPL license?', answer: 'The AGPL license ensures that any improvements made to the software remain open source, protecting the community and preventing proprietary lock-in.' }
					]
				}
			}
		]
	},
	pt_BR: {
		page: {
			title: 'Meisterfy',
			description: 'A plataforma de marketing completa que o seu agente de IA consegue operar.',
			og_banner: {
				logo: '/images/open-source/meisterfy-logo.webp',
				title: 'MEISTERFY',
				subtitle: 'Plataforma de Marketing Completa e Open-source'
			}
		},
		blocks: [
			{
				_type: 'hero',
				data: {
					headline: 'MEISTERFY',
					tagline: 'Plataforma open-source para agências gerenciarem Redes Sociais, Google Ads e geração de conteúdo com IA.',
					actions: [
						{ label: 'Ver no GitHub', url: 'https://github.com/meisterfy/meisterfy', variant: 'primary' },
						{ label: 'Documentação', url: 'https://github.com/meisterfy/docs', variant: 'secondary' },
					],
					logo: '/images/open-source/meisterfy-logo.webp'
				}
			},
			{
				_type: 'story',
				data: {
					title: "Meister... O quê??",
					hook: "Quase todas as agências com as quais já trabalhei usam a mesma stack caótica: algum SaaS para agendamento, painel do Google Ads para campanhas, ChatGPT numa aba separada para ideias de conteúdo e uma planilha em algum lugar para amarrar tudo. Nada disso conversa entre si ou lembra a voz da marca do seu cliente.",
					callout: "Meisterfy está aqui para acabar com o copia e cola entre ferramentas, em um só lugar você tem toda a stack de marketing."
				}
			},
			{
				_type: 'modules',
				data: {
					items: [
						{
							title: 'Redes Sociais',
							url: 'https://your-site.com/your-tenant/social',
							image: '/images/open-source/meisterfy/social-media-module.webp',
							description: 'Um calendário visual para planejar, aprovar e publicar posts no Facebook e Instagram. Use seu provedor de IA preferido para criar rascunhos de posts e fazer brainstorm.',
							bullets: [
								'Fluxo de aprovação com Controle de Acesso Baseado em Papéis (RBAC)',
								'Publicação nativa no Meta via OAuth2',
								'Agnóstico a provedores de IA, mas com a identidade da marca já embutida',
								'Armazenamento de mídia no S3 ou Cloudflare R2',
							]
						},
						{
							title: 'Google Ads',
							url: 'https://your-site.com/your-tenant/ads/google',
							image: '/images/open-source/meisterfy/google-ads-module.webp',
							description: 'Monitore e gerencie suas Campanhas, Grupos, Termos de Pesquisa e Critérios de Lances. Misture dados em tempo real e armazenamento local para melhores relatórios e uma estrutura de dados pronta para IA.',
							bullets: [
								'Retenção opcional de 180 dias de métricas para relatórios mais ricos e consultas rápidas',
								'Ferramenta de Chat com IA para obter insights em tempo real',
								'Geração Automatizada de Relatórios, com insights opcionais gerados por IA em cada relatório',
								'Gerencie todas as suas campanhas diretamente dentro da plataforma',
							]
						},
						{
							title: 'Plug & Play',
							url: 'https://your-site.com/settings/connections',
							image: '/images/open-source/meisterfy/settings-connections.webp',
							description: 'Conecte suas ferramentas favoritas com alguns cliques e atribua diretamente ao seu cliente. O sistema de conexões foi desenhado para suportar diversas integrações novas no futuro.',
							bullets: [
								'Verdadeira experiência plug and play',
								'Use a mesma conexão com mais de um cliente',
								'Suas chaves, seus dados. Nunca compartilhados',
								'Pronto para novas conexões',
							]
						},
						{
							title: 'Conteúdo & Relatórios com IA',
							image: '/images/open-source/meisterfy/google-ads-module-2.webp',
							description: 'Gere conteúdo com a identidade real da marca do seu cliente: persona principal, tom de voz, instruções personalizadas de IA e hashtags padrão embutidas. Use a IA para criar relatórios baseados em métricas e personalidade reais.',
							bullets: [
								'Chatbot com IA em tempo real sobre o seu cliente',
								'Identidade de marca por tenant (persona, tom, hashtags, nicho, idioma)',
								'Geração de posts para redes sociais em lote com IA',
								'Gere e agende relatórios de IA',
							]
						},
						{
							title: 'Servidor MCP Nativo',
							url: 'https://your-site.com/your-tenant/settings/mcp',
							image: '/images/open-source/meisterfy/settings-mcp.webp',
							description: 'O Meisterfy vem com um servidor nativo do Model Context Protocol (MCP)! Agentes de IA externos, como Claude, ChatGPT, Gemini, Kimi, DeepSeek, Perplexity ou qualquer cliente compatível com MCP (e IDEs), podem se autenticar com uma chave de API restrita e interagir programaticamente com seus dados de marketing.',
							bullets: [
								'O MCP é um protocolo agnóstico e padrão global',
								'Agentes podem extrair relatórios, diagnosticar anomalias e ajustar orçamentos',
								'As chaves de API têm escopos definidos (somente leitura, editor ou admin)',
								'As chaves são geradas e revogadas diretamente na UI de configurações do tenant',
							],
							callout: "Seu agente de IA pode dizer: 'Notei que esta palavra-chave está gastando muito e não convertendo - posso adicioná-la como negativa?' E ele pode realmente fazer isso. Não apenas sugerir."
						},
					]
				}
			},
			{
				_type: 'integrations',
				data: {
					heading: 'Conecte o Que Você Já Usa',
					items: [
						{ name: 'Meta', logo: '/connectors/meta.svg' },
						{ name: 'Google Ads', logo: '/connectors/googleads.svg' },
						{ name: 'Claude', logo: '/connectors/anthropic.svg' },
						{ name: 'ChatGPT', logo: '/connectors/openai.svg' },
						{ name: 'Gemini', logo: '/connectors/gemini.svg' },
						{ name: 'Kimi', logo: '/connectors/kimi.svg' },
						{ name: 'Groq', logo: '/connectors/groq.svg' },
						{ name: 'AWS S3', logo: '/connectors/s3.svg' },
						{ name: 'Cloudflare R2', logo: '/connectors/r2.svg' },
						{ name: 'Resend', logo: '/connectors/resend.svg' },
						{ name: 'Brevo', logo: '/connectors/brevo.svg' },
						{ name: 'Sentry', logo: '/connectors/sentry.svg' }
					],
				}
			},
			{
				_type: 'stats',
				data: {
					heading: 'Feito para Durar. Não para Impressionar.',
					stats: [
						{ stat: '85%+', label: 'Cobertura de testes de integração na camada de repositório' },
						{ stat: '260+', label: 'Testes de frontend usando testes unitários Vitest + componentes Playwright. Com fluxos e2e Playwright cobrindo autenticação, rotas protegidas e criação de posts' },
						{ stat: 'CI', label: 'Pipeline completo cobrindo lint, build, vet, unitários, integração, eslint, prettier, typescript, scan de segurança, frontend, localização e fumaça (smoke)' },
						{ stat: 'AGPL-3.0', label: 'Totalmente open source, para sempre.' }
					],
					faqs: [
						{ question: 'É realmente open source?', answer: 'Sim, totalmente open source sob a licença AGPL-3.0. Você pode visualizar, fazer um fork e hospedar você mesmo todo o código fonte.' },
						{ question: 'Quem paga pelas chamadas de IA?', answer: 'Você traz as suas próprias chaves de API (BYOK) para os modelos de IA que utilizar, assim você tem total controle sobre seu uso e os custos.' },
						{ question: 'Preciso ter Meta e Google verificados no meu app?', answer: 'Sim! Você precisará usar as suas próprias contas de desenvolvedor do Meta e Google e completar os processos de verificação caso necessário para seus casos de uso. Porém, o app já está configurado para usar suas chaves.' },
						{ question: 'O servidor MCP vai funcionar com o meu LLM?', answer: 'Sim, nosso servidor MCP utiliza protocolos padrão que são compatíveis com os principais LLMs como Claude, ChatGPT, Gemini e outros.' },
						{ question: 'Quando a versão alpha será lançada?', answer: 'O alpha está em desenvolvimento ativo. Fique ligado para atualizações no nosso cronograma de lançamentos.' },
						{ question: 'Quando a versão cloud será lançada?', answer: 'A prioridade agora é garantir o lançamento das versões alpha e beta, ajustar e arrumar o máximo possível, e então começaremos a construir a versão cloud. O app open-source será o mesmo, sem lock-in de fornecedor.' },
						{ question: 'E se eu quiser usar apenas para um cliente?', answer: 'Tudo bem! A plataforma foi projetada para escalar desde um único cliente até grandes agências.' },
						{ question: 'Por que a licença AGPL?', answer: 'A licença AGPL garante que quaisquer melhorias feitas no software continuem abertas, protegendo a comunidade e prevenindo lock-in proprietário.' }
					]
				}
			}
		]
	}
}
