import { tiptapToHtml } from "./blocks/tiptap-to-html";

export function calculateReadingTime(post: any, locale: string = 'en'): string {
    let text = "";
    if (post.data?.content) {
        if (Array.isArray(post.data.content)) {
            text = tiptapToHtml({ content: post.data.content } as any);
        }
        else if ((post.data.content as any).content && Array.isArray((post.data.content as any).content)) {
            text = tiptapToHtml(post.data.content as any);
        }
    } else {
        text = post.content || "";
    }

    const cleanText = text.replace(/<[^>]*>/g, ' ');
    const words = cleanText.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} ${locale === "pt_BR" ? "min de leitura" : "min read"}`;
}
