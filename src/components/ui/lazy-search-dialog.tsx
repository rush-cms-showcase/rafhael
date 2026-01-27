import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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

export default function LazySearchDialog(props: GlobalSearchDialogProps) {
    const [Component, setComponent] = useState<React.ComponentType<GlobalSearchDialogProps> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadComponent = async () => {
             setIsLoading(true);
             try {
                 const mod = await import("./global-search-dialog");
                 setComponent(() => mod.default);
             } finally {
                 setIsLoading(false);
             }
        };
        
        const handleOpenSearch = () => {
            if (!Component) loadComponent();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (!Component) loadComponent();
            }
        };

        window.addEventListener("open-global-search", handleOpenSearch);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("open-global-search", handleOpenSearch);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [Component]);

    if (isLoading) {
        // Simple Loading Spinner Portal
        if (typeof document === 'undefined') return null;
        return createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>,
            document.body
        );
    }

    if (!Component) return null;

    return <Component {...props} />;
}
