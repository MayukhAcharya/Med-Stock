import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class Medicine extends Model {
  static table = 'medicines';

  @text('medicine_name') medicineName!: string;
  @field('category') category!: string;
  @field('quantity') quantity!: string;
  @field('expiry_date') expiryDate!: string;
  @field('uses') uses!: string;
}
