// Helper to map format names to HTML tags
export function getTagForFormat(formatName: string): string {
    const formatMap: Record<string, string> = {
        bold: 'STRONG',
        italic: 'EM',
        underline: 'U',
        unorderedList: 'UL'
        // Add more as needed
    }
    return formatMap[formatName] || formatName.toUpperCase()
}
