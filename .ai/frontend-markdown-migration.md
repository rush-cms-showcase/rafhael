# Frontend Migration Guide: TipTap JSON to Markdown

> [!IMPORTANT]
> The `content` field in the API response has evolved. It may now return a **Markdown String** instead of the legacy **TipTap JSON Object**. Frontend applications must handle both formats during the transition period.

## The Change
Previously, the `content` field returned a structured JSON object complying with the TipTap/Prosemirror schema:
```json
{
  "type": "doc",
  "content": [
    { "type": "paragraph", "content": [...] }
  ]
}
```

Now, it can return a simple Markdown string:
```markdown
# My Title
This is a paragraph with an ![Image](https://site.com/storage/img.webp).
```

## Detection Strategy
Your frontend component should implement a "Content Guard" to decide which renderer to use.

### JavaScript / TypeScript Example
```typescript
function ContentRenderer({ data }) {
  // 1. Detect Standard String (Markdown)
  if (typeof data === 'string') {
    return <MarkdownRenderer content={data} />;
  }

  // 2. Detect JSON Object (Legacy TipTap)
  if (typeof data === 'object' && data !== null && data.type === 'doc') {
     return <TipTapRenderer content={data} />;
  }

  // 3. Fallback
  return null;
}
```

## Rendering Markdown
We recommend using a standard library like `react-markdown` (for React) or `marked` (for vanilla JS).

### Image Handling
The backend pipeline **automatically converts and fully qualifies** image URLs.
-   You do **not** need to handle relative paths.
-   You do **not** need to fetch images from a separate API.
-   The URL provided in the markdown (`![alt](http://...)`) is the final, public, CDN-ready WebP URL.

### Styling
Since Markdown is raw HTML structure (h1, p, img), you should apply your typography styles to the wrapper container (e.g., via `@tailwindcss/typography` using `prose` class).

```tsx
<article className="prose lg:prose-xl">
  <MarkdownRenderer content={post.content} />
</article>
```

## FAQs
**Q: Do I need to support Custom Blocks in Markdown?**
A: No. Markdown is used for simpler content. Complex interactive blocks will remain in the JSON/Block Editor format. If the API returns a string, assume it's "safe", standard Markdown.

**Q: What about existing posts?**
A: Existing posts remain in JSON format until an editor manually converts them. Your code **MUST** support both formats indefinitely (or until a full database migration is authorized).
