import type { SearchIndexItem } from '../lib/search-service';

export interface SearchConfig {
    locale: "en" | "pt_BR";
    basePrefix: string;
}

export function initGlobalSearch({ locale, basePrefix }: SearchConfig) {
    let fuse: any = null;
    let searchIndex: SearchIndexItem[] = [];
    let isLoadingIndex = false;
    let isOpen = false;
    let selectedIndex = -1;
    let results: SearchIndexItem[] = [];

    const dialog = document.getElementById('global-search-dialog');
    const backdrop = document.getElementById('global-search-backdrop');
    const closeBtn = document.getElementById('global-search-close');
    const input = document.getElementById('global-search-input') as HTMLInputElement;
    const loadingEl = document.getElementById('global-search-loading');
    const emptyEl = document.getElementById('global-search-empty');
    const initialEl = document.getElementById('global-search-initial');
    const resultsList = document.getElementById('global-search-results-list');

    if (!dialog || !input || !resultsList) return;

    // Date formatting helper
    function formatDate(dateString: string) {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString(locale === 'pt_BR' ? 'pt-BR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return '';
        }
    }

    // Toggle Modal
    function toggleModal(show: boolean) {
        isOpen = show;
        if (show) {
            dialog?.classList.remove('hidden');
            dialog?.classList.add('flex');
            dialog?.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => input?.focus(), 50);
            
            if (searchIndex.length === 0 && !isLoadingIndex) {
                loadIndex();
            }
        } else {
            dialog?.classList.add('hidden');
            dialog?.classList.remove('flex');
            dialog?.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (input) input.value = '';
            results = [];
            selectedIndex = -1;
            renderResults();
        }
    }

    // Load Fuse Index
    async function loadIndex() {
        if (isLoadingIndex) return;
        isLoadingIndex = true;
        updateUIState('loading');

        try {
            // Dynamic import for code splitting
            const [{ fetchSearchIndex }, { default: Fuse }] = await Promise.all([
                import('../lib/search-service'),
                import('fuse.js')
            ]);
            
            searchIndex = await fetchSearchIndex(locale);
            
            fuse = new Fuse(searchIndex, {
                keys: ['title'],
                threshold: 0.3,
                includeScore: true
            });
        } catch (error) {
            console.error('Failed to load search index', error);
        } finally {
            isLoadingIndex = false;
            if (isOpen) {
                 if (input?.value.trim() === '') {
                    updateUIState('initial');
                 } else {
                    performSearch(input?.value || '');
                 }
            }
        }
    }

    // Perform Search
    function performSearch(query: string) {
        if (!query || !fuse) {
            results = [];
            renderResults();
            updateUIState(query ? 'empty' : 'initial');
            return;
        }

        const fuseResults = fuse.search(query);
        results = fuseResults.map((r: any) => r.item).slice(0, 8);
        selectedIndex = -1;
        renderResults();
        
        if (results.length === 0) {
            updateUIState('empty');
        } else {
            updateUIState('results');
        }
    }

    // Render Results
    function renderResults() {
        if (!resultsList) return;
        resultsList.innerHTML = '';
        
        results.forEach((result, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = `${basePrefix}/blog/${result.slug}`;
            a.className = `block p-4 transition-colors group border-l-4 ${
                index === selectedIndex 
                ? 'bg-primary/10 border-primary' 
                : 'hover:bg-bg-elevated border-transparent'
            }`;
            
            const title = document.createElement('h4');
            title.className = `font-bold text-lg transition-colors ${
                index === selectedIndex ? 'text-primary' : 'text-text-main group-hover:text-primary'
            }`;
            title.textContent = result.title;
            
            const meta = document.createElement('span');
            meta.className = 'text-xs text-text-muted mt-1 block';
            meta.textContent = result.type === 'blog' && result.published_at 
                ? formatDate(result.published_at) 
                : '';
                
            a.appendChild(title);
            a.appendChild(meta);
            li.appendChild(a);
            
            // Click handler
            a.addEventListener('click', () => toggleModal(false));
            
            resultsList.appendChild(li);
        });
    }

    // Update UI State Helper
    function updateUIState(state: 'loading' | 'empty' | 'initial' | 'results') {
        loadingEl?.classList.add('hidden');
        emptyEl?.classList.add('hidden');
        initialEl?.classList.add('hidden');
        resultsList?.classList.add('hidden');

        switch(state) {
            case 'loading':
                loadingEl?.classList.remove('hidden');
                break;
            case 'empty':
                emptyEl?.classList.remove('hidden');
                break;
            case 'initial':
                initialEl?.classList.remove('hidden');
                break;
            case 'results':
                resultsList?.classList.remove('hidden');
                break;
        }
    }

    // Event Listeners
    
    // Open/Close Shortcuts
    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleModal(true);
        }
        if (e.key === 'Escape' && isOpen) {
            toggleModal(false);
        }
    });

    window.addEventListener('open-global-search', () => toggleModal(true));

    // UI Interaction
    backdrop?.addEventListener('click', () => toggleModal(false));
    closeBtn?.addEventListener('click', () => toggleModal(false));

    // Input Handling
    input?.addEventListener('input', (e) => {
        performSearch((e.target as HTMLInputElement).value);
    });

    input?.addEventListener('keydown', (e) => {
        if (!isOpen || results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % results.length;
            renderResults();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + results.length) % results.length;
            renderResults();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex !== -1) {
                const selectedResult = results[selectedIndex];
                if (selectedResult) {
                     window.location.href = `${basePrefix}/blog/${selectedResult.slug}`;
                     toggleModal(false);
                }
            }
        }
    });
}
