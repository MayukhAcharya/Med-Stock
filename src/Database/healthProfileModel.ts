import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class HealthProfile extends Model {
  static table = 'healthProfiles';

  @field('profile_name') profileName!: string;
  @field('medication_type') medicationType!: string;
  @field('gender') gender!: string;
  @field('gender_avatar') genderAvatar!: string;
  @field('medicine_array') medicineArray!: string;
  @field('start_date') startDate!: string;
  @field('end_date') endDate!: string;
  @field('is_done') isDone!: boolean;
}
