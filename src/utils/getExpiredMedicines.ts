import { database } from 'src/Database/database';
import { ReusableDateFormatter } from './FormattedDate';

type medicineDataTypes = {
  category: string;
  expiry_date: string;
  id: string;
  medicine_name: string;
  quantity: string;
  uses: string;
  mark_as_required: boolean;
};

export const getExpiredMedicines = async () => {
  let allMedicines: any[] = [];
  let data = [];
  try {
    const medicineData = database.get('medicines');
    const items = await medicineData.query().fetch();
    allMedicines = items.map(item => ({
      ...item._raw,
    }));
  } catch (error) {}

  let expired: medicineDataTypes[] = [];
  const todayDate = ReusableDateFormatter(new Date());
  const [day1, month1, year1] = todayDate.split('/').map(Number);

  allMedicines.map(item => {
    if (item.mark_as_required) {
      const itemDate = ReusableDateFormatter(item.expiry_date);
      const [day2, month2, year2] = itemDate.split('/').map(Number);

      const d1: any = new Date(year1, month1 - 1, day1);
      const d2: any = new Date(year2, month2 - 1, day2);

      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        expired.push(item);
      }
    }
  });

  return expired;
};

export function isWithinNotificationWindow() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Define allowed time ranges as [startHour, endHour]
  const ranges = [
    [9, 10], // 9am - 10am
    [13, 14], // 1pm - 2pm
    [18, 19], // 6pm - 7pm
    [21, 22], // 9pm - 10pm
  ];

  return ranges.some(([start, end]) => {
    return hours >= start && (hours < end || (hours === end && minutes === 0));
  });
}
