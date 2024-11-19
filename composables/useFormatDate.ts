export const useFormatDate = (date: string) => {
  const formatDate = (isoString: string): string => {
    if (!isoString) return '';

    const date = new Date(isoString);
    return date.toLocaleString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };
  return useState('date', () => formatDate(date))
}