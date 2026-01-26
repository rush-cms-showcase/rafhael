import { calculateReadingTime } from "../../lib/post-utils";
import { formatDate } from "../../lib/date-utils";
import type { BlogPost } from "../../lib/rush";

interface BlogListProps {
    initialPosts: BlogPost[];
    categories?: { name: string; slug: string }[];
    labels: {
        readMore: string;
        allCategories: string; 
    };
    locale?: "en" | "pt_BR";
    taxonomies?: {
        category: { label: string; slug: string };
        tag: { label: string; slug: string };
    };
    pagination?: {
        currentPage: number;
        lastPage: number;
        url: {
            prev?: string;
            next?: string;
        };
    };
}

export default function BlogList({ initialPosts, categories, labels, locale = "en", taxonomies, pagination }: BlogListProps) {
    const basePrefix = locale === "pt_BR" ? "/br" : "";
    const catSlug = taxonomies?.category.slug || "category";

    return (
        <div className="w-full">
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
                <a
                    href={`${basePrefix}/blog`}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-primary text-white shadow-lg"
                >
                    {labels.allCategories}
                </a>
                {categories && categories.map((cat) => (
                    <a
                        key={cat.slug}
                        href={`${basePrefix}/${catSlug}/${cat.slug}`}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-bg-elevated text-text-muted hover:bg-bg-elevated/80 hover:text-primary border border-border"
                    >
                        {cat.name}
                    </a>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {initialPosts.map((post) => (
                    <ArticleCard 
                        key={post.id} 
                        post={post} 
                        readMoreLabel={labels.readMore} 
                        locale={locale}
                        taxonomies={taxonomies}
                    />
                ))}
            </div>
            
            {/* Pagination Controls */}
            {pagination && pagination.lastPage > 1 && (
                <div className="flex justify-center gap-4 mt-16 animate-fade-in-up">
                    {pagination.url.prev && (
                        <a 
                            href={pagination.url.prev}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-bg-elevated border border-border hover:border-primary hover:text-primary transition-all font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                            {locale === 'pt_BR' ? 'Anterior' : 'Previous'}
                        </a>
                    )}
                    
                    <span className="flex items-center px-4 font-serif font-bold text-text-muted">
                        {pagination.currentPage} / {pagination.lastPage}
                    </span>
                    
                    {pagination.url.next && (
                        <a 
                            href={pagination.url.next}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-bg-elevated border border-border hover:border-primary hover:text-primary transition-all font-medium"
                        >
                            {locale === 'pt_BR' ? 'Próxima' : 'Next'}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </a>
                    )}
                </div>
            )}
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
                <div className="relative aspect-video overflow-hidden block">
                    <a href={`${basePrefix}/blog/${post.slug}`} className="block w-full h-full">
                        <img
                            src={post.featured_image.preview || post.featured_image.url}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </a>
                    {post.categories && post.categories.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
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
                </div>
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
                        const readingTime = calculateReadingTime(post, locale);
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
