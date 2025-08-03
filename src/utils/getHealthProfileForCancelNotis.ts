import { database } from 'src/Database/database';
import { ReusableDateFormatter } from 'src/utils/FormattedDate';

export const getHealthProofileForCancelNotis = async () => {
  let allHealthProfile: any[] = [];
  let notificationIds: string[] = [];
  let profileIds: string[] = [];
  try {
    const healthProfileData = database.get('healthProfiles');
    const items = await healthProfileData.query().fetch();
    allHealthProfile = items.map(item => item._raw);
  } catch (error) {}

  const todayDate = ReusableDateFormatter(new Date());
  const [day1, month1, year1] = todayDate.split('/').map(Number);

  allHealthProfile.map(item => {
    const itemDate = ReusableDateFormatter(item.end_date);
    const [day2, month2, year2] = itemDate.split('/').map(Number);

    const d1: any = new Date(year1, month1 - 1, day1);
    const d2: any = new Date(year2, month2 - 1, day2);

    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0 && !item.is_done) {
      const medicineArray = JSON.parse(item.medicine_array);
      notificationIds.push(
        medicineArray.map((item: any) => item.notificationId),
      );
      profileIds.push(item.id);
    }
  });

  const flattenedNotificationIds = notificationIds.flat();

  return { flattenedNotificationIds, profileIds };
};
