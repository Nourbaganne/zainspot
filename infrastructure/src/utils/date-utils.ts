import { subMonths, startOfMonth, endOfMonth } from 'date-fns';

export const getStartOfPreviousMonth = () => {
  return startOfMonth(subMonths(new Date(), 1)).toISOString();
};

export const getEndOfPreviousMonth = () => {
  return endOfMonth(subMonths(new Date(), 1)).toISOString();
};
