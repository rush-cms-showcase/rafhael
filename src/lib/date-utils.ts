export function formatDate(dateString: string, locale: string = 'en'): string {
    const date = new Date(dateString);
    
    // Invalid date check
    if (isNaN(date.getTime())) {
        return "";
    }

    if (locale === 'pt_BR' || locale === 'pt') {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    }

    // US Format: "Jan 12, 2025" (More elegant for blogs than 01/12/2025)
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}
