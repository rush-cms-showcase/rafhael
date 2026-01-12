import { useState, useMemo } from "react";
import { tiptapToHtml } from "../../lib/blocks/tiptap-to-html";
import { formatDate } from "../../lib/date-utils";
import type { BlogPost } from "../../lib/rush";

interface BlogSearchProps {
    initialPosts: BlogPost[];
    labels: {
        searchPlaceholder: string;
        readMore: string;
        emptyStateTitle: string;
        emptyStateText: string;
        allCategories: string;
    };
    locale?: "en" | "pt_BR";
    taxonomies?: {
        category: { label: string; slug: string };
        tag: { label: string; slug: string };
    };
}

export default function BlogSearch({ initialPosts, labels, locale = "en", taxonomies }: BlogSearchProps) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = useMemo(() => {
        const cats = new Set<string>();
        initialPosts.forEach((post) => {
            if (post.categories && post.categories.length > 0) {
                post.categories.forEach((cat) => cats.add(cat.name));
            }
        });
        return Array.from(cats);
    }, [initialPosts]);

    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory
                ? post.categories?.some((cat) => cat.name === selectedCategory)
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [initialPosts, search, selectedCategory]);

    return (
        <div className="w-full">
            <div className="mb-12 space-y-6">
                <div className="relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder={labels.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-main placeholder-text-muted"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>

                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-bg-elevated text-text-muted hover:bg-bg-card border border-border"
                                }`}
                        >
                            {labels.allCategories}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-bg-elevated text-text-muted hover:bg-bg-card border border-border"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <ArticleCard 
                            key={post.id} 
                            post={post} 
                            readMoreLabel={labels.readMore} 
                            locale={locale}
                            taxonomies={taxonomies}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-main mb-2">
                            {labels.emptyStateTitle}
                        </h3>
                        <p className="text-text-muted">
                            {labels.emptyStateText}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ArticleCard({ post, readMoreLabel, locale = "en", taxonomies }: { 
    post: BlogPost; 
    readMoreLabel: string;
    locale?: "en" | "pt_BR";
    taxonomies?: { category: { slug: string }; tag: { slug: string } };
}) {
    const hasImage = !!post.featured_image;
    const basePrefix = locale === "pt_BR" ? "/br" : "";
    const catSlug = taxonomies?.category.slug || "category";

    return (
        <article className={`group flex flex-col bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 ${!hasImage ? 'animate-fade-in' : ''}`}>
            {hasImage && post.featured_image && (
                <a href={`${basePrefix}/blog/${post.slug}`} className="relative aspect-video overflow-hidden block">
                    <img
                        src={post.featured_image.preview || post.featured_image.url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {post.categories && post.categories.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {post.categories.map((cat) => (
                                <a 
                                    key={cat.slug} 
                                    href={`${basePrefix}/${catSlug}/${cat.slug}`}
                                    className="inline-flex items-center rounded px-3 py-1 text-xs font-medium bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors"
                                >
                                    {cat.name}
                                </a>
                            ))}
                        </div>
                    )}
                </a>
            )}

            <div className={`flex-1 p-6 flex flex-col ${!hasImage ? 'justify-center' : ''}`}>
                {!hasImage && post.categories && post.categories.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {post.categories.map((cat) => (
                            <a
                                key={cat.slug}
                                href={`${basePrefix}/${catSlug}/${cat.slug}`} 
                                className="inline-flex items-center rounded px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                                {cat.name}
                            </a>
                        ))}
                    </div>
                )}

                <a
                    href={`${basePrefix}/blog/${post.slug}`}
                    className="group-hover:text-primary transition-colors block"
                >
                    <h3 className={`font-serif font-bold mb-3 leading-tight ${hasImage ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                        {post.title}
                    </h3>
                </a>

                <div className="flex items-center justify-between pt-6 mt-auto">
                    {(() => {
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
                        const readingTime = `${minutes} ${locale === "pt_BR" ? "min de leitura" : "min read"}`;
                        const date = post.published_at ? formatDate(post.published_at, locale) : "";

                        return (
                            <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
                                <div className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>{readingTime}</span>
                                </div>
                                
                                {date && (
                                    <div className="flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span>{date}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    <a
                        href={`${basePrefix}/blog/${post.slug}`}
                        className="text-sm font-bold text-primary flex items-center gap-1 group/link"
                    >
                        {readMoreLabel}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
}
