import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Profile extends Model {
  static table = 'profile';

  @field('full_name') fullName!: string;
  @field('age') age!: string;
  @field('gender') gender!: string;
  @field('allergies') allergies!: any;
  @field('autoStart') autostart!: boolean;
}
