export type TimePeriod = 'all' | 'yearly' | 'monthly' | 'biweekly' | 'fortnight' | 'weekly';

export function getDateRange(period: TimePeriod): { startDate: Date; endDate: Date } {
  const now = new Date();
  const endDate = new Date(now);
  const startDate = new Date(now);

  switch (period) {
    case 'all':
      startDate.setFullYear(2000); // Or any reasonable start date for "all time"
      break;
    case 'yearly':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case 'monthly':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'biweekly':
      startDate.setDate(now.getDate() - 14);
      break;
    case 'fortnight':
      startDate.setDate(now.getDate() - 14);
      break;
    case 'weekly':
      startDate.setDate(now.getDate() - 7);
      break;
    default:
      startDate.setDate(now.getDate() - 7); // Default to weekly
  }

  return { startDate, endDate };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function isDateInRange(date: string, startDate: Date, endDate: Date): boolean {
  const checkDate = new Date(date);
  return checkDate >= startDate && checkDate <= endDate;
}
