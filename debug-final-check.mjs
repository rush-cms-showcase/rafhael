
import fs from 'fs';
import path from 'path';

console.log('--- Validação Final Pós-Ajuste ---');
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

const { RUSH_BASE_URL, RUSH_API_TOKEN, RUSH_SITE_SLUG } = config;

console.log(`LENDO DO .ENV:`);
console.log(`RUSH_SITE_SLUG="${RUSH_SITE_SLUG}" (Deve ser 'rafhael')`);

if (RUSH_SITE_SLUG !== 'rafhael') {
    console.error('ERRO CRÍTICO: O .env ainda não está salvo como "rafhael". Verifique o arquivo.');
}

const collection = 'blog';
const url = `${RUSH_BASE_URL}/api/v1/${RUSH_SITE_SLUG}/collections/${collection}/entries`;

console.log(`\nURL montada: ${url}`);

async function run() {
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
            console.log('SUCESSO TOTAL! A API respondeu com dados.');
            // console.log(text.substring(0, 500)); 
            try {
                const json = JSON.parse(text);
                const count = json.data ? json.data.length : 0;
                console.log(`Entries encontradas: ${count}`);
            } catch {
                console.log('JSON parse error (mas request foi OK)');
            }
        } else {
            console.log('FALHA:');
            console.log(text.substring(0, 500));
        }

    } catch (err) {
        console.error('Erro de rede:', err.message);
    }
}

run();
