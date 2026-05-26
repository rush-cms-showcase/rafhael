import type { DynamicPageContent } from '@/types/blocks'

export const aipimContent: DynamicPageContent = {
	en: {
		page: {
			title: 'AIPIM',
			description: 'Event-sourced project manager with MCP server. Keeps your AI sessions focused, your token budget predictable, and your project history immutable.',
			og_banner: {
				title: 'AIPIM',
				subtitle: 'AI Project Instruction Manager'
			}
		},
		blocks: [
			{
				_type: 'hero-terminal',
				data: {
					headline: 'AIPIM',
					tagline: 'Event-sourced project manager with MCP server. Keeps your AI sessions focused, your token budget predictable, and your project history immutable.',
					actions: [
						{ label: 'View on GitHub', url: 'https://github.com/rmarsigli/aipim', variant: 'primary' },
						{ label: 'npm install -g aipim', url: 'https://www.npmjs.com/package/aipim', variant: 'secondary' }
					],
					command: {
						text: 'npm install -g aipim && aipim install',
						caption: 'Works with Claude Code, Gemini CLI, and Cursor'
					}
				}
			},
			{
				_type: 'story',
				data: {
					title: 'Every AI session starts from zero',
					hook: "Every time you open a new session, your AI agent has no idea what you built yesterday. You paste context, re-explain conventions, re-describe the architecture. And if you lean on open-ended agent loops, the token bill compounds - the model spends context re-reading what it already did three messages ago.",
					callout: "In a real legacy migration: 29 tasks, each 30–100K tokens, each starting with a clean context. Some batched together, some isolated. More efficient than open-ended agent loops - and the history is immutable."
				}
			},
			{
				_type: 'modules',
				data: {
					items: [
						{
							title: 'Context-Bound Tasks',
							description: 'AIPIM decomposes your project into tasks sized to fit a context window. One task per session, /clear between them. No context bloat, no wasted tokens re-establishing state.',
							bullets: [
								'Token budget stays predictable per task',
								'Sessions stay focused and fast',
								'Works better than open-ended agent loops for long projects',
								'ADRs and comments captured immutably per task'
							]
						},
						{
							title: 'Event Sourcing',
							description: 'All state lives in events.jsonl, an append-only log. SQLite is rebuilt from those events at startup - a read model, never the source of truth. You can rebuild everything from the log alone.',
							bullets: [
								'Immutable audit trail of all project decisions',
								'git merge=union driver - no merge conflicts on concurrent pushes',
								'Rebuild the database anytime by replaying events',
								'Works offline - no external service required'
							]
						},
						{
							title: 'MCP Server',
							description: 'A local Hono server on port 3141 exposes your project tools directly to Claude Code via JSON-RPC. No clipboard, no copy-paste, no human acting as middleware between the LLM and the filesystem.',
							bullets: [
								'get_next_task, create_task, complete_task, log_decision and more',
								'Dynamic Active Skills enabled per-project via config.toml',
								'database skill: read-only SQLite access for AI-powered queries',
								'One command to register: claude mcp add aipim http://localhost:3141/mcp'
							]
						},
						{
							title: 'Visual UI with Svelte 5',
							description: 'A full web interface served by the same Hono process. Kanban board, event timeline, and task detail panel with inline markdown editor. Real-time via SSE - move a card in one tab, all tabs update.',
							bullets: [
								'Drag-and-drop Kanban - native HTML5, no library',
								'SSE live updates across all open browser tabs',
								'Inline task markdown editor with comment thread',
								'Event timeline with filters by type, member, and period'
							]
						},
						{
							title: 'Own Skills',
							description: 'Two complementary skill layers. Context Modules inject focused coding guidelines directly into your AI instruction file. Active Skills add MCP tools dynamically per-project - no restart needed.',
							bullets: [
								'19 built-in context modules: TypeScript, React, Laravel, Tailwind, Rust, Python and more',
								'Inject with: aipim add skill typescript',
								'Idempotent - running the command twice never duplicates content',
								'Active skills hot-reload on the next tools/list call'
							]
						}
					]
				}
			},
			{
				_type: 'stats',
				data: {
					heading: 'Built with the same rigor it helps you apply.',
					stats: [
						{ stat: '238', label: 'Tests - unit + E2E covering the full CLI and MCP surface' },
						{ stat: '107 KB', label: 'npm tarball. Zero bloat. Ships with a compiled Svelte UI included.' },
						{ stat: '19', label: 'Built-in coding skills: TypeScript, React, Laravel, Tailwind, Rust, Python and more' },
						{ stat: 'MIT', label: 'Fully open-source, forever.' }
					],
					faqs: [
						{
							question: 'How is this different from just using Claude\'s built-in task tools?',
							answer: 'AIPIM gives you explicit context boundaries. You decide when to clear and restart. Agent-driven loops are powerful but compound token usage over long sessions - the model keeps re-reading earlier context. AIPIM is the intentional alternative: bounded tasks, clean starts, immutable history.'
						},
						{
							question: 'Does it work with Gemini CLI or Cursor?',
							answer: 'Yes. aipim install --ai gemini generates GEMINI.md. --ai cursor generates .cursorrules. The MCP server itself is editor-agnostic - any MCP-compatible client can connect.'
						},
						{
							question: 'Do I need a team to use it?',
							answer: 'No. Solo mode works out of the box - no config.toml needed. Actor defaults to your git email. Team features (assignments, concurrent pushes, member tracking) activate when you add a config.toml.'
						},
						{
							question: 'What if I\'m migrating from AIPIM 1.x?',
							answer: 'Run aipim migrate. It reads your existing backlog/*.md and completed/*.md, synthesizes events, and rebuilds SQLite. Your original markdown files are preserved.'
						},
						{
							question: 'Is the database safe from accidental AI writes?',
							answer: 'Yes. The database Active Skill only allows SELECT, EXPLAIN, and PRAGMA statements. A hard regex at the driver level blocks all write operations before execution - INSERT, UPDATE, DROP, ALTER, DELETE are all rejected.'
						},
						{
							question: 'What about AIPIM 3.0?',
							answer: 'A cloud-native version is in early planning: 100% open-source, free, and MCP-first. AIPIM 2.x stays fully supported.'
						}
					]
				}
			}
		]
	},
	pt_BR: {
		page: {
			title: 'AIPIM',
			description: 'Gerenciador de projetos com event sourcing e servidor MCP. Mantém suas sessões de IA focadas, o orçamento de tokens previsível e o histórico do projeto imutável.',
			og_banner: {
				title: 'AIPIM',
				subtitle: 'AI Project Instruction Manager'
			}
		},
		blocks: [
			{
				_type: 'hero-terminal',
				data: {
					headline: 'AIPIM',
					tagline: 'Gerenciador de projetos com event sourcing e servidor MCP. Mantém suas sessões de IA focadas, o orçamento de tokens previsível e o histórico do projeto imutável.',
					actions: [
						{ label: 'Ver no GitHub', url: 'https://github.com/rmarsigli/aipim', variant: 'primary' },
						{ label: 'npm install -g aipim', url: 'https://www.npmjs.com/package/aipim', variant: 'secondary' }
					],
					command: {
						text: 'npm install -g aipim && aipim install',
						caption: 'Funciona com Claude Code, Gemini CLI e Cursor'
					}
				}
			},
			{
				_type: 'story',
				data: {
					title: 'Toda sessão de IA começa do zero',
					hook: 'Toda vez que você abre uma nova sessão, seu agente de IA não sabe o que você construiu ontem. Você cola contexto, re-explica convenções, re-descreve a arquitetura. E se você depende de loops de agentes abertos, a conta de tokens cresce - o modelo fica relendo o que já fez três mensagens atrás.',
					callout: 'Em uma migração legada real: 29 tasks, cada uma com 30–100K tokens, cada uma começando com contexto limpo. Algumas em lote, outras isoladas. Mais eficiente que loops de agentes abertos - e o histórico é imutável.'
				}
			},
			{
				_type: 'modules',
				data: {
					items: [
						{
							title: 'Tasks com Contexto Delimitado',
							description: 'O AIPIM decompõe seu projeto em tasks dimensionadas para caber em uma janela de contexto. Uma task por sessão, /clear entre elas. Sem inchaço de contexto, sem tokens desperdiçados reestabelecendo estado.',
							bullets: [
								'Orçamento de tokens previsível por task',
								'Sessões focadas e rápidas',
								'Mais eficiente que loops abertos em projetos longos',
								'ADRs e comentários capturados imutavelmente por task'
							]
						},
						{
							title: 'Event Sourcing',
							description: 'Todo o estado vive em events.jsonl, um log append-only. O SQLite é reconstruído a partir desses eventos na inicialização - um modelo de leitura, nunca a fonte da verdade. Você pode reconstruir tudo a partir do log.',
							bullets: [
								'Trilha de auditoria imutável de todas as decisões do projeto',
								'Driver git merge=union - sem conflitos de merge em pushes simultâneos',
								'Reconstrua o banco de dados a qualquer momento reproduzindo os eventos',
								'Funciona offline - nenhum serviço externo necessário'
							]
						},
						{
							title: 'Servidor MCP',
							description: 'Um servidor Hono local na porta 3141 expõe as ferramentas do projeto diretamente ao Claude Code via JSON-RPC. Sem clipboard, sem copy-paste, sem humano agindo como middleware entre o LLM e o sistema de arquivos.',
							bullets: [
								'get_next_task, create_task, complete_task, log_decision e mais',
								'Active Skills dinâmicos habilitados por projeto via config.toml',
								'Skill database: acesso somente leitura ao SQLite para consultas com IA',
								'Um comando para registrar: claude mcp add aipim http://localhost:3141/mcp'
							]
						},
						{
							title: 'UI Visual (Svelte 5)',
							description: 'Uma interface web completa servida pelo mesmo processo Hono. Quadro Kanban, timeline de eventos e painel de detalhes de task com editor markdown inline. Tempo real via SSE - mova um card em uma aba, todas as abas atualizam.',
							bullets: [
								'Kanban drag-and-drop - HTML5 nativo, sem biblioteca',
								'Atualizações ao vivo via SSE em todas as abas abertas',
								'Editor markdown inline com thread de comentários',
								'Timeline de eventos com filtros por tipo, membro e período'
							]
						},
						{
							title: 'Sistema de Skills',
							description: 'Duas camadas complementares de skills. Context Modules injetam diretrizes de codificação diretamente no seu arquivo de instrução de IA. Active Skills adicionam ferramentas MCP dinamicamente por projeto - sem restart necessário.',
							bullets: [
								'19 context modules built-in: TypeScript, React, Laravel, Tailwind, Rust, Python e mais',
								'Injete com: aipim add skill typescript',
								'Idempotente - rodar o comando duas vezes nunca duplica o conteúdo',
								'Active skills recarregam na próxima chamada tools/list'
							]
						}
					]
				}
			},
			{
				_type: 'stats',
				data: {
					heading: 'Construído com o mesmo rigor que ele ajuda você a aplicar.',
					stats: [
						{ stat: '238', label: 'Testes - unitários + E2E cobrindo todo o CLI e a superfície MCP' },
						{ stat: '107 KB', label: 'Tarball npm. Zero inchaço. Já inclui a UI Svelte compilada.' },
						{ stat: '19', label: 'Skills de codificação built-in: TypeScript, React, Laravel, Tailwind, Rust, Python e mais' },
						{ stat: 'MIT', label: 'Totalmente open-source, para sempre.' }
					],
					faqs: [
						{
							question: 'Como isso é diferente das ferramentas de task nativas do Claude?',
							answer: 'O AIPIM te dá limites explícitos de contexto. Você decide quando limpar e reiniciar. Loops de agentes são poderosos mas acumulam uso de tokens em sessões longas - o modelo fica relendo contextos anteriores. O AIPIM é a alternativa intencional: tasks delimitadas, inícios limpos, histórico imutável.'
						},
						{
							question: 'Funciona com Gemini CLI ou Cursor?',
							answer: 'Sim. aipim install --ai gemini gera GEMINI.md. --ai cursor gera .cursorrules. O servidor MCP em si é agnóstico ao editor - qualquer cliente compatível com MCP pode se conectar.'
						},
						{
							question: 'Preciso de uma equipe para usar?',
							answer: 'Não. O modo solo funciona imediatamente - nenhum config.toml necessário. O ator padrão é o seu email do git. As funcionalidades de equipe (atribuições, pushes simultâneos, rastreamento de membros) ativam quando você adiciona um config.toml.'
						},
						{
							question: 'E se eu estiver migrando do AIPIM 1.x?',
							answer: 'Execute aipim migrate. Ele lê seus backlog/*.md e completed/*.md existentes, sintetiza eventos e reconstrói o SQLite. Seus arquivos markdown originais são preservados.'
						},
						{
							question: 'O banco de dados está protegido de escritas acidentais da IA?',
							answer: 'Sim. A Active Skill de banco de dados só permite SELECT, EXPLAIN e PRAGMA. Uma regex rígida no nível do driver bloqueia todas as operações de escrita antes da execução - INSERT, UPDATE, DROP, ALTER e DELETE são todos rejeitados.'
						},
						{
							question: 'E o AIPIM 3.0?',
							answer: 'Uma versão cloud-native está em planejamento inicial: 100% open-source, gratuita e MCP-first. O AIPIM 2.x continua com suporte completo.'
						}
					]
				}
			}
		]
	}
}
