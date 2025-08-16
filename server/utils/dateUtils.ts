export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0] || '';
};

export const formatDateTime = (date: Date): string => {
  return date.toISOString();
};

export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

export const addDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const getCurrentSemester = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() returns 0-11
  const year = now.getFullYear();
  
  if (month >= 9 || month <= 1) {
    // Fall semester (September - January)
    return month >= 9 ? `Fall ${year}` : `Fall ${year - 1}`;
  } else if (month >= 2 && month <= 5) {
    // Spring semester (February - May)
    return `Spring ${year}`;
  } else {
    // Summer semester (June - August)
    return `Summer ${year}`;
  }
};
