import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schema } from 'src/Database/schema';
import Profile from 'src/Database/profileModel';
import Medicine from 'src/Database/medicineModel';
import HealthProfile from 'src/Database/healthProfileModel';

const adapter = new SQLiteAdapter({
  schema: schema,
});

export const database = new Database({
  adapter: adapter,
  modelClasses: [Profile, Medicine, HealthProfile],
});
