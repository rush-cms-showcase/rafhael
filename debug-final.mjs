
import fs from 'fs';
import path from 'path';

console.log('--- Diagnóstico Rush CMS ---');
const envPath = path.resolve(process.cwd(), '.env');
let config = {};

// Ler .env
if (fs.existsSync(envPath)) {
    const data = fs.readFileSync(envPath, 'utf8');
    data.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            config[key.trim()] = value.join('=').trim().replace(/"/g, '').replace(/'/g, '');
        }
    });
}

const { RUSH_BASE_URL, RUSH_API_TOKEN, RUSH_SITE_SLUG, RUSH_SITE_ID } = config;

console.log(`Base URL: ${RUSH_BASE_URL}`);
console.log(`Site Slug: ${RUSH_SITE_SLUG}`);
console.log(`Site ID: ${RUSH_SITE_ID}`);
console.log(`Token: ${RUSH_API_TOKEN ? 'Presente' : 'Ausente'}`);

async function testFetch(url, description) {
    console.log(`\n--- Testando: ${description} ---`);
    console.log(`URL: ${url}`);
    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${RUSH_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        if (res.ok) {
            console.log('SUCESSO!');
            console.log('Início da resposta:', text.substring(0, 300));
        } else {
            console.log('ERRO:');
            console.log(text.substring(0, 300));
        }
        return res.ok;
    } catch (e) {
        console.error('Falha na requisição:', e.message);
        return false;
    }
}

async function run() {
    // 1. Teste básico de coleções (para validar token e site slug)
    // Rota: /api/v1/{siteSlug}/collections
    await testFetch(
        `${RUSH_BASE_URL}/api/v1/${RUSH_SITE_SLUG}/collections`,
        'Listar Coleções (Valida Token + Slug)'
    );

    // 2. Teste buscando entries com SLUG 'blog'
    await testFetch(
        `${RUSH_BASE_URL}/api/v1/${RUSH_SITE_SLUG}/collections/blog/entries`,
        'Buscar Entries do Blog (via Slug "blog")'
    );

    // 3. Teste buscando entries com ID 5 (que vimos anteriormente)
    await testFetch(
        `${RUSH_BASE_URL}/api/v1/${RUSH_SITE_SLUG}/collections/5/entries`,
        'Buscar Entries do Blog (via ID 5)'
    );

    // 4. Teste alternativo usando SITE_ID no lugar do slug na URL (caso a API suporte)
    if (RUSH_SITE_ID) {
        await testFetch(
            `${RUSH_BASE_URL}/api/v1/${RUSH_SITE_ID}/collections/blog/entries`,
            'Buscar Entries usando SITE ID na URL'
        );
    }
}

run();
