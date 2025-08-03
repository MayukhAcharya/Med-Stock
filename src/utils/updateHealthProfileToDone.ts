import { database } from 'src/Database/database';
import HealthProfile from 'src/Database/healthProfileModel';

export const updateHealthProfileToDone = async (profileIds: string[]) => {
  for (let [index, item] of profileIds.entries()) {
    try {
      const medicationUpdate = await database
        .get<HealthProfile>('healthProfiles')
        .find(item);
      await database.write(async () => {
        await medicationUpdate.update(medicationDb => {
          medicationDb.isDone = true;
        });
      });
    } catch (error) {}
  }
};
