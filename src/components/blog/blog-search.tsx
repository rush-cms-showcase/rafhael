import { useState, useMemo } from "react";
import type { BlogPost } from "../../lib/rush";

interface BlogSearchProps {
    initialPosts: BlogPost[];
}

export default function BlogSearch({ initialPosts }: BlogSearchProps) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = useMemo(() => {
        const cats = new Set<string>();
        initialPosts.forEach((post) => {
            if (post.category?.name) {
                cats.add(post.category.name);
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
                ? post.category?.name === selectedCategory
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
                        placeholder="Buscar conteúdo..."
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
                            Todos
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
                        <ArticleCard key={post.id} post={post} />
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
                            Nenhum artigo encontrado
                        </h3>
                        <p className="text-text-muted">
                            Tente buscar por outros termos ou categorias.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ArticleCard({ post }: { post: BlogPost }) {
    const hasImage = !!post.cover_image;

    return (
        <article className={`group flex flex-col bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 ${!hasImage ? 'animate-fade-in' : ''}`}>
            {hasImage && (
                <a href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden block">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {post.category && (
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center rounded px-3 py-1 text-xs font-medium bg-primary text-white shadow-lg">
                                {post.category.name}
                            </span>
                        </div>
                    )}
                </a>
            )}

            <div className={`flex-1 p-6 flex flex-col ${!hasImage ? 'justify-center' : ''}`}>
                {!hasImage && post.category && (
                    <div className="mb-4">
                        <span className="inline-flex items-center rounded px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {post.category.name}
                        </span>
                    </div>
                )}

                <a
                    href={`/blog/${post.slug}`}
                    className="group-hover:text-primary transition-colors block"
                >
                    <h3 className={`font-serif font-bold mb-3 leading-tight ${hasImage ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                        {post.title}
                    </h3>
                </a>

                <div className="flex items-center justify-between pt-6 mt-auto">
                    <div className="flex items-center gap-2">
                        {post.author?.avatar ? (
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full border border-border"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-bold text-text-muted">
                                {(post.author?.name || "R").charAt(0)}
                            </div>
                        )}
                        <span className="text-xs font-medium text-text-main">
                            {post.author?.name || "Rafhael Marsigli"}
                        </span>
                    </div>

                    <a
                        href={`/blog/${post.slug}`}
                        className="text-sm font-bold text-primary flex items-center gap-1 group/link"
                    >
                        Ler mais
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
