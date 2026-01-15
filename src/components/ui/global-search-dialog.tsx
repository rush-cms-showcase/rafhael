import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Fuse from 'fuse.js';
import { fetchSearchIndex, type SearchIndexItem } from "../../lib/search-service";
import  { formatDate } from "../../lib/date-utils";

interface GlobalSearchDialogProps {
    locale?: "en" | "pt_BR";
    labels: {
        placeholder: string;
        emptyTitle: string;
        emptyText: string;
        initialText: string;
        loadingText: string;
    };
}

export default function GlobalSearchDialog({ locale = "en", labels }: GlobalSearchDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<SearchIndexItem[]>([]);
    const [isLoadingIndex, setIsLoadingIndex] = useState(false);
    const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const fuseRef = useRef<Fuse<SearchIndexItem> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Open/Close Logic
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        const handleOpenSearch = () => setIsOpen(true);
        
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-global-search", handleOpenSearch);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-global-search", handleOpenSearch);
        };
    }, []);

    // Focus input on open and reset selection
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setSelectedIndex(-1);
            
            // Lazy load index
            if (searchIndex.length === 0 && !isLoadingIndex) {
               loadIndex();
            }
        }
    }, [isOpen]);

    const loadIndex = async () => {
        setIsLoadingIndex(true);
        const index = await fetchSearchIndex(locale);
        setSearchIndex(index);
        
        fuseRef.current = new Fuse(index, {
            keys: ['title'],
            threshold: 0.3, 
            includeScore: true
        });
        setIsLoadingIndex(false);
    };

    // Perform Search
    useEffect(() => {
        if (!search || !fuseRef.current) {
            setSearchResults([]);
            return;
        }
        const results = fuseRef.current.search(search);
        setSearchResults(results.map(r => r.item).slice(0, 8));
    }, [search]);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchResults.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex - 1 + searchResults.length) % searchResults.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex !== -1) {
                const selectedResult = searchResults[selectedIndex];
                if (selectedResult) {
                    // Programmatically click the link
                    const link = document.querySelector(`a[href="${basePrefix}/blog/${selectedResult.slug}"]`) as HTMLAnchorElement;
                    if (link) {
                        link.click();
                    }
                    setIsOpen(false);
                }
            }
        }
    };

    if (!isOpen) return null;

    const basePrefix = locale === "pt_BR" ? "/br" : "";

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 font-sans text-text-main">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-bg-main/80 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                
                {/* Header / Input */}
                <div className="flex items-center border-b border-border p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-text-muted mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder={labels.placeholder}
                        className="flex-1 bg-transparent border-none outline-none text-lg text-text-main placeholder-text-muted h-10"
                    />
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-2 ml-2 text-text-muted hover:text-text-main hover:bg-bg-elevated rounded-md transition-colors"
                    >
                        <span className="sr-only">Close</span>
                        <kbd className="hidden md:inline-block px-2 py-0.5 text-xs font-mono bg-bg-elevated rounded border border-border">ESC</kbd>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {isLoadingIndex && (
                        <div className="p-8 text-center text-text-muted">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            {labels.loadingText}
                        </div>
                    )}

                    {!isLoadingIndex && search.length > 0 && searchResults.length === 0 && (
                        <div className="p-12 text-center text-text-muted">
                            <p className="font-medium mb-1">{labels.emptyTitle}</p>
                            <p className="text-sm">{labels.emptyText}</p>
                        </div>
                    )}
                    
                    {!isLoadingIndex && search.length === 0 && (
                         <div className="p-12 text-center text-text-muted">
                             <p className="text-sm">{labels.initialText}</p>
                        </div>
                    )}

                    {searchResults.length > 0 && (
                         <ul className="divide-y divide-border/50">
                            {searchResults.map((result, index) => (
                                <li key={result.slug}>
                                    <a 
                                        href={`${basePrefix}/blog/${result.slug}`}
                                        className={`block p-4 transition-colors group ${index === selectedIndex ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-bg-elevated border-l-4 border-transparent'}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <h4 className={`font-bold text-lg transition-colors ${index === selectedIndex ? 'text-primary' : 'text-text-main group-hover:text-primary'}`}>
                                            {result.title}
                                        </h4>
                                        <span className="text-xs text-text-muted mt-1 block">
                                            {result.type === 'blog' && result.published_at ? formatDate(result.published_at, locale) : ''}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
