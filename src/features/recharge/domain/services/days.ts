export const getPreviousDay = (minusDays = 0): Date => {
  const date = new Date();
  const previous = new Date(new Date().getTime());
  previous.setDate(date.getDate() - minusDays);

  return previous;
};
