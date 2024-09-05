// src/app/utils/date-utils.ts

/**
 * Formata uma data no formato de hora 'HH:mm:ss' para a localidade brasileira.
 * @param date A data a ser formatada como string ou objeto Date.
 * @returns Uma string formatada representando a hora no formato 'HH:mm:ss'.
 */
export function formatTime(date: Date | string): string {
    if (!date) return '';
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return dateObject.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  
  /**
   * Formata uma data no formato de data 'DD/MM/YYYY' para a localidade brasileira.
   * @param date A data a ser formatada como string ou objeto Date.
   * @returns Uma string formatada representando a data no formato 'DD/MM/YYYY'.
   */
  export function formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return dateObject.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  