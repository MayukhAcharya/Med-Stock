export const to24HourFormat = (time12h: string) => {
  const [time, modifier] = time12h
    .trim()
    .replace(/\u202F/g, ' ')
    .split(' '); // e.g., "9:47", "PM"
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (modifier.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  // Pad with zero if needed
  const hourStr = String(hours).padStart(2, '0');
  const minuteStr = String(minutes).padStart(2, '0');

  return { hourStr, minuteStr };
};
