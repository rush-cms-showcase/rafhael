# Guia de Configuração de Webhook para SSG (Rush CMS)

Este guia orienta o Agente do Rush CMS sobre como implementar o Webhook que dispara um novo build do site estático (SSG) sempre que um conteúdo for alterado.

## O Conceito
Como o site utiliza **SSG (Static Site Generation)** para performance máxima, as páginas HTML são geradas apenas no momento do "Build". Para que novos posts do blog apareçam no site, é necessário disparar uma reconstrução (Rebuild) externamente.

## Requisito para o Rush CMS
O Rush CMS (Filament) precisa de um **Observer** ou **Event Listener** que monitore os eventos `created`, `updated` e `deleted` nas Collections (ex: Blog Posts).

Quando esses eventos ocorrerem, o sistema deve fazer uma requisição `POST` para a URL do Webhook de Deploy.

---

## 1. Configuração na Vercel (Recomendado)
Se o site estiver hospedado na Vercel:

1.  Vá em **Project Settings** > **Git**.
2.  Desça até **Deploy Hooks**.
3.  Crie um novo Hook:
    *   **Name**: `Rush CMS Update`
    *   **Branch**: `main`
4.  Copie a URL gerada (ex: `https://api.vercel.com/v1/integrations/deploy/prj_...`).

**Ação do Agente Rush:**
Use essa URL para disparar o `POST` request.

---

## 2. Configuração em Hospedagem Própria (Coolify / Hetzner)
Se estiver usando Coolify para gerenciar o deploy:

1.  No Painel do Coolify, vá no recurso (Application).
2.  Vá em **Webhooks**.
3.  Procure por **"Deploy Webhook"** (geralmente uma URL que termina com `/deploy?uuid=...`).
4.  Copie essa URL.

**Ação do Agente Rush:**
Use essa URL para disparar o `POST` request (funciona como um `curl` simples).

---

## Sugestão de Implementação PHP (Laravel/Filament)

No `AppServiceProvider` ou em um `Observer` dedicado:

```php
use Illuminate\Support\Facades\Http;

class BlogPostObserver
{
    public function saved(BlogPost $post)
    {
        $this->triggerBuild();
    }

    public function deleted(BlogPost $post)
    {
        $this->triggerBuild();
    }

    private function triggerBuild()
    {
        $webhookUrl = config('services.deployment.webhook_url');

        if ($webhookUrl) {
            // Dispara assincronamente para não travar o admin
            Http::timeout(5)->post($webhookUrl);
        }
    }
}
```
