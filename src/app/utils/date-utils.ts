export function formatTime(date: Date | string): string {
  if (!date) return '';
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
