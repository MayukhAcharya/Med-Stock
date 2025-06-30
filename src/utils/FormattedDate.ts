export const ReusableDateFormatter = (selectedDate: any) => {
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
    weekday: undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return formattedDate;
};
