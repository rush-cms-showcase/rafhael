import type { APIRoute } from 'astro';
import { rushConfig } from '../../../rush.config';

export function getStaticPaths() {
  return [
    { params: { locale: 'en' } },
    { params: { locale: 'pt_BR' } },
  ];
}

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale;
  
  // Configuration
  const baseUrl = "https://app.rushcms.com";
  const apiToken = "1|BpHoX36Uv9ziBdtFXV6Y4k9lYE1AJ2oBE4NmYnTb";
  const siteSlug = "rafhael";

  try {
    console.log(`[StaticBuild] Generating search index for: ${locale}`);
    const response = await fetch(`${baseUrl}/api/v1/${siteSlug}/collections/blog/search-index?locale=${locale}`, {
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch search index from CMS: ${response.status}`);
    }

    const data = await response.json();
    
    // Inject 'type: blog' to ensure frontend can distinguish posts from pages
    const enhancedData = data.map((item: any) => ({
        ...item,
        type: 'blog'
    }));

    return new Response(JSON.stringify(enhancedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(`[StaticBuild] Error generating index for ${locale}:`, error);
    return new Response(JSON.stringify([]), { status: 200 });
  }
}
