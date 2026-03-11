// Простий конвертер Markdown → HTML без зайніх залежностей
export function markdownToHtml(md: string): string {
  return md
    // H2
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered list items — збираємо в <ul>
    .replace(/((?:^- .+\n?)+)/gm, (block) => {
      const items = block.trim().split('\n').map((line) => `<li>${line.replace(/^- /, '')}</li>`).join('');
      return `<ul>${items}</ul>`;
    })
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Paragraphs (рядки що не є тегами)
    .replace(/^(?!<[a-z]).+$/gm, (line) => line.trim() ? `<p>${line}</p>` : '')
    // Прибираємо подвійні порожні рядки
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
