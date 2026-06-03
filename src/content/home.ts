import type { HomeLocaleContent } from '@/types/content'

export const homeContent: Record<'en' | 'pt_BR', HomeLocaleContent> = {
    pt_BR: {
        hero: {
            title: "Engenheiro Full-Stack <span class='text-primary italic'>&</span> Construtor de Plataformas",
            subtitle:
                '15+ anos construindo sistemas web escaláveis, arquiteturas resilientes e produtos-chave para empresas. Especializado em diversos ecossistemas e gestão de infraestrutura de ponta a ponta.',
            ctaPrimary: 'Agendar uma Conversa',
            ctaSecondary: 'Ver no GitHub',
            stats: [
                { value: '15+', label: 'Anos entregando sistemas em produção' },
                { value: '10+', label: 'Anos como engenheiro líder solo' },
                { value: '100%', label: 'Trabalhando remotamente desde 2015' },
            ],
            codeSnippet: {
                className: 'RafhaelMarsigli',
                role: '{Engenheiro, Arquiteto} de Software',
                roleComment: '// domínio hands-on em arquitetura e infraestrutura',
                stack: ['PHP', 'Laravel', 'Golang', 'React', 'TypeScript', 'Astro'],
                exp: '15+ anos',
                open: true,
                openComment: '// remoto',
            },
        },
        philosophy: {
            label: 'Filosofia de Engenharia',
            title: 'Como eu construo Software?',
            intro: '"Só" escrever o código não é mais o suficiente. Projetos precisam ser escaláveis e duradouros. Meu foco é em manutenibilidade, arquitetura limpa e resolução de lógica de negócio complexa sem over-engineering.',
            items: [
                {
                    icon: 'quality',
                    title: 'Padrões Rígidos de Qualidade',
                    description:
                        'Pipelines robustos de CI/CD, projetos com centenas de testes automatizados (unit, integration e smoke tests), Tipagem estrita, código limpo e princípios SOLID para garantir deploys seguros e confiáveis.',
                },
                {
                    icon: 'ownership',
                    title: 'Ownership de Ponta a Ponta',
                    description:
                        'Acostumado e Confortável em lidar com tudo: desde o brainstorming, escolha de stack para a ocasião, design de bancos de dados, filas, processamento até o deploy e gestão de infraestrutura em servidores bare-metal.',
                },
                {
                    icon: 'team',
                    title: 'Time & Cultura',
                    description:
                        'Gosto de ambientes que valorizam discussões arquiteturais profundas, code reviews e aprendizado contínuo ao lado de times distribuídos.',
                },
            ],
        },
        beyond: {
            label: 'Além do Código',
            title: 'Quem sou eu',
            paragraphs: [
                'Baseado em São Paulo, Brasil (UTC-3), com disponibilidade flexível para sobreposição com o horário da Costa Leste dos EUA e manhãs europeias. Me comunico em inglês com proficiência profissional: fluente na escrita e leitura, e confiante na comunicação falada.',
                'Passei a última década aperfeiçoando a disciplina do trabalho remoto para permanecer perto da minha família. Todos esses anos de trabalho assíncrono me ensinaram a me comunicar de forma mais objetiva e clara.',
                'Uso IA extensivamente no meu dia a dia para otimizar fluxos de trabalho, tenho uma plataforma própria para gerenciar projetos. Também desenvolvo soluções e plataformas que utilizam IA, desde chatbots até integrações com RAG.',
            ],
            location: 'São Paulo, Brasil (UTC-3)',
            language: 'Inglês profissional: escrito e falado',
            workStyle: 'Full remote com mais de 10 anos de experiência',
        },
        blog: {
            shareTitle: 'Compartilhe com quem você gosta',
            readMore: 'Ler artigo',
            searchPlaceholder: 'Buscar artigos...',
            emptyStateTitle: 'Nenhum artigo encontrado',
            emptyStateText: 'Tente buscar por outros termos ou categorias.',
            allCategories: 'Todos',
        },
        latestPosts: {
            title: 'Últimos Posts',
            viewAll: 'Ver todos',
        },
        taxonomies: {
            category: {
                label: 'Categoria',
                slug: 'categoria',
            },
            tag: {
                label: 'Tag',
                slug: 'tag',
            },
        },
        testimonial: {
            quote: '\"Consigo anunciar minhas páginas com tranquilidade, tenho total certeza de que todo o lead vai ter o máximo de aproveitamento.\"',
            author: 'Julio Leite',
            role: 'Proprietário da Pórtico',
        },
        metadata: {
            title: 'Rafhael Marsigli - Engenheiro Full-Stack',
            description:
                'Engenheiro Full-Stack com 15+ anos construindo sistemas escaláveis, plataformas e infraestrutura. Buscando oportunidades remotas internacionais.',
        },
        ctaSection: {
            title: 'Vamos construir algo incrível juntos.',
            button: 'Agendar uma Conversa',
        },
        global: {
            nav: {
                about: 'Sobre Mim',
                openSource: 'Open Source',
                cases: 'Cases',
                blog: 'Blog',
                login: 'Login',
                contact: 'Fale Comigo',
            },
            footer: {
                terms: 'Termos',
                termsLink: '/br/termos-de-uso',
                privacy: 'Privacidade',
                privacyLink: '/br/politica-de-privacidade',
                rights: 'Todos os direitos reservados.',
                created_by: 'Criado por',
                powered_by: 'Powered by',
            },
        },
        aboutMe: {
            title: 'Sobre Mim',
            hero: {
                brow: 'Sobre Mim',
                title: 'Construindo <br/> <span class=\"text-primary\">Excelência Digital</span>',
                subtitle:
                    'De interfaces pixel-perfect à infraestrutura bruta. Um Engenheiro de Produto com visão de Arquiteto.',
            },
            quote: '\"Tecnologia não é apenas sobre usar a stack mais recente; é sobre resolver problemas. Um bom software é previsível para quem o mantém e invisível para quem o usa. A complexidade deve residir no código, não na vida do usuário.\"',
            journey: {
                title: 'A Jornada',
                subtitle: 'De Coder a Engenheiro de Produto',
                text1: 'Minha evolução técnica não foi linear; foi cumulativa. Comecei curioso sobre colocar pixels na tela, mas rapidamente percebi que um layout bonito não sustenta um sistema instável. Ao longo dos anos, deixei de ser apenas um \"coder\" para me tornar um <strong>Engenheiro de Produto com visão de Arquiteto</strong>.',
                text2: 'Atuei em todas as frentes: do ajuste fino de interfaces pixel-perfect à configuração de infraestrutura bruta em servidores <em>self-hosted</em>. Essa experiência \"Full Cycle\" removeu o glamour e o substituiu por pragmatismo. Hoje, quando desenho uma arquitetura, não penso apenas na teoria de livros - penso em como ela se comportará em produção, como será debugada e quanto custará escalar. Não vendo balas de prata; construo sistemas que param em pé.',
            },
            philosophy: {
                title: 'Filosofia & Abordagem',
                subtitle: 'Pragmatismo Técnico',
                text1: 'Arquitetura de software é, essencialmente, o gerenciamento de <em>trade-offs</em>. Não existe \"melhor tecnologia\", apenas a ferramenta certa para o contexto atual do negócio.',
                text2: 'Evito <em>over-engineering</em> tanto quanto evito código espaguete. Se precisamos de um MVP rápido, usamos ferramentas que aceleram a entrega. Se o foco é performance crítica e escala, desenhamos microsserviços desacoplados e otimizamos queries.',
                text3: 'Uso conceitos de Clean Architecture e DDD não como regras religiosas, mas como guias para manter a base de código saudável. Meu objetivo é entregar software que gere valor hoje sem criar um pesadelo de manutenção para a equipe amanhã.',
            },
            connect: {
                title: 'Vamos Conectar',
                text: 'Não utilizo redes sociais, você pode me encontrar em:',
            },
        },
    },
    en: {
        hero: {
            title: 'Full-Stack Engineer <span class="text-primary italic">&</span> Platform Builder',
            subtitle:
                '15+ years building scalable web systems, resilient architectures, and key products for companies. Specialized in diverse ecosystems and end-to-end infrastructure management.',
            ctaPrimary: 'Schedule a Call',
            ctaSecondary: 'View on GitHub',
            stats: [
                { value: '15+', label: 'Years shipping production systems' },
                { value: '10+', label: 'Years as sole lead engineer' },
                { value: '100%', label: 'Working remotely since 2015' },
            ],
            codeSnippet: {
                className: 'RafhaelMarsigli',
                role: 'Software {Engineer, Architect}',
                roleComment: '// hands-on ownership in architecture and infrastructure',
                stack: ['PHP', 'Laravel', 'Golang', 'React', 'TypeScript', 'Astro'],
                exp: '15+ years',
                open: true,
                openComment: '// remote',
            },
        },
        philosophy: {
            label: 'Engineering Philosophy',
            title: 'How I build Software?',
            intro: '"Just" writing code is no longer enough. Projects need to be scalable and enduring. My focus is on maintainability, clean architecture, and solving complex business logic without over-engineering.',
            items: [
                {
                    icon: 'quality',
                    title: 'Strict Quality Standards',
                    description:
                        'Robust CI/CD pipelines, projects with hundreds of automated tests (unit, integration, and smoke tests), strict typing, clean code, and SOLID principles to ensure safe and reliable deployments.',
                },
                {
                    icon: 'ownership',
                    title: 'End-to-End Ownership',
                    description:
                        'Accustomed and comfortable handling everything: from brainstorming and picking the right stack for the occasion, to database design, queues, processing, up to deployment and bare-metal server infrastructure management.',
                },
                {
                    icon: 'team',
                    title: 'Team & Culture',
                    description:
                        'I enjoy environments that value deep architectural discussions, code reviews, and continuous learning alongside distributed teams.',
                },
            ],
        },
        stack: {
            label: 'Technical Arsenal',
            title: 'The Stack',
            groups: [
                {
                    label: 'Backend & Architecture',
                    tags: ['Golang', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Redis', 'REST APIs'],
                },
                {
                    label: 'Frontend',
                    tags: ['React', 'TypeScript', 'JavaScript', 'Astro'],
                },
                {
                    label: 'Infrastructure & DevOps',
                    tags: ['Docker', 'Nginx', 'Linux', 'CI/CD', 'Hetzner', 'Coolify', 'Portainer'],
                },
                {
                    label: 'Currently Mastering',
                    highlight: true,
                    tags: ['Rust'],
                },
            ],
        },
        projects: {
            label: 'Track Record',
            title: 'Featured Projects',
            items: [
                {
                    name: 'Mega Model Sul',
                    role: 'Full-Stack Engineer & Infrastructure',
                    period: '2013 – Present',
                    description:
                        'Lead engineer and infrastructure owner for a decade+. Scaled the platform, managed legacy-to-modern migrations, handled infra, backend systems, websites, and landing pages - ensuring maximum uptime and technical resilience.',
                    tags: ['Laravel', 'PHP', 'React', 'Astro', 'Nginx', 'Infra'],
                    link: null,
                    type: 'client',
                },
                {
                    name: 'Rush CMS',
                    role: 'Creator & Lead Developer',
                    period: '2025',
                    description:
                        'A proprietary headless CMS built to streamline multi-tenant content delivery. Complex multi-tenancy architecture, automated payment gateway integrations, and a custom Filament-powered admin.',
                    tags: ['Laravel', 'Filament', 'PHP', 'Multi-tenancy'],
                    link: 'https://rushcms.com',
                    type: 'product',
                },
                {
                    name: 'AIPIM',
                    role: 'Author - Open Source',
                    period: '2025',
                    description:
                        'An open-source AI Project Instruction Manager built to handle complex context windows in AI-assisted development workflows. Currently at v2.0.0.',
                    tags: ['Open Source', 'AI', 'TypeScript', 'v2.0.0'],
                    link: 'https://github.com/rmarsigli/aipim',
                    type: 'opensource',
                },
            ],
        },
        beyond: {
            label: 'Beyond the Code',
            title: 'Who I am',
            paragraphs: [
                'Based in São Paulo, Brazil (UTC-3), with flexible availability for overlap with US East Coast and European morning hours. I communicate in English at professional proficiency: fluent in written and reading, and confident in spoken communication.',
                'I have spent the last decade mastering remote work discipline to stay close to my family. All these years of asynchronous work have taught me to communicate more objectively and clearly.',
                'I use AI extensively in my daily routine to optimize workflows, and I have my own platform for managing projects. I also develop solutions and platforms that utilize AI, ranging from chatbots to RAG integrations.',
            ],
            location: 'São Paulo, Brazil (UTC-3)',
            language: 'Professional English: written & spoken',
            workStyle: 'Full remote with over 10 years of experience',
        },
        blog: {
            shareTitle: 'Share with those you love',
            readMore: 'Read article',
            searchPlaceholder: 'Search articles...',
            emptyStateTitle: 'No articles found',
            emptyStateText: 'Try searching for other terms or categories.',
            allCategories: 'All',
        },
        latestPosts: {
            title: 'Latest Blog Posts',
            viewAll: 'View all',
        },
        taxonomies: {
            category: {
                label: 'Category',
                slug: 'category',
            },
            tag: {
                label: 'Tag',
                slug: 'tag',
            },
        },
        testimonial: {
            quote: '\"I can advertise my pages with peace of mind, I am absolutely sure that every lead will get the maximum value from them.\"',
            author: 'Julio Leite',
            role: 'Owner of Pórtico',
        },
        metadata: {
            title: 'Rafhael Marsigli - Full-Stack Engineer',
            description:
                'Full-Stack Engineer with 15+ years building scalable systems, platforms, and infrastructure. Seeking international remote opportunities.',
        },
        ctaSection: {
            title: "Let's build something great together.",
            button: 'Schedule a Call',
        },
        global: {
            nav: {
                about: 'About Me',
                openSource: 'Open Source',
                cases: 'Cases',
                blog: 'Blog',
                login: 'Login',
                contact: 'Contact Me',
            },
            footer: {
                terms: 'Terms',
                termsLink: '/terms-of-use',
                privacy: 'Privacy',
                privacyLink: '/privacy-policy',
                rights: 'All rights reserved.',
                created_by: 'Created by',
                powered_by: 'Powered by',
            },
        },
        aboutMe: {
            title: 'About Me',
            hero: {
                brow: 'About Me',
                title: 'Building <br/> <span class=\"text-primary\">Digital Excellence</span>',
                subtitle:
                    "From pixel-perfect interfaces to raw infrastructure. A Product Engineer with an Architect's vision.",
            },
            quote: "'Technology isn't just about using the latest stack; it's about solving problems. Good software is predictable for those who maintain it and invisible to those who use it. Complexity should reside in the code, not in the user's life.'",
            journey: {
                title: 'The Journey',
                subtitle: 'From Coder to Product Engineer',
                text1: "My technical evolution wasn't linear; it was cumulative. I started out curious about putting pixels on a screen, but quickly realized that a beautiful layout cannot sustain an unstable system. Over the years, I moved from being just a 'coder' to becoming a <strong>Product Engineer with an Architect's vision</strong>.",
                text2: "I have worked on every front: from fine-tuning pixel-perfect interfaces to configuring raw infrastructure on <em>self-hosted</em> servers. This 'Full Cycle' experience stripped away the glamour and replaced it with pragmatism. Today, when I design an architecture, I don't just think about textbook theory-I think about how it will behave in production, how it will be debugged, and what it will cost to scale. I don't sell silver bullets; I build systems that stand up.",
            },
            philosophy: {
                title: 'Philosophy & Approach',
                subtitle: 'Technical Pragmatism',
                text1: "Software architecture is, essentially, the management of <em>trade-offs</em>. There is no 'best technology,\" only the right tool for the business's current context.",
                text2: 'I avoid <em>over-engineering</em> just as much as I avoid spaghetti code. If we need a fast MVP, we use tools that accelerate delivery. If the focus is critical performance and scale, we design decoupled microservices and optimize queries.',
                text3: 'I use Clean Architecture and DDD concepts not as religious rules, but as guides to keep the codebase healthy. My goal is to deliver software that generates value today without creating a maintenance nightmare for the team tomorrow.',
            },
            connect: {
                title: "Let's Connect",
                text: 'I do not use social networks, you can find me in:',
            },
        },
    },
}

export type HomeContent = HomeLocaleContent
