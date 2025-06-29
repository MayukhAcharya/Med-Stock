import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'profile',
      columns: [
        {
          name: 'full_name',
          type: 'string',
        },
        {
          name: 'age',
          type: 'string',
        },
        {
          name: 'gender',
          type: 'string',
        },
        {
          name: 'allergies',
          type: 'string',
        },
      ],
    }),
    tableSchema({
      name: 'medicines',
      columns: [
        {
          name: 'medicine_name',
          type: 'string',
        },
        {
          name: 'category',
          type: 'string',
          isOptional: true,
        },
        {
          name: 'quantity',
          type: 'string',
        },
        {
          name: 'expiry_date',
          type: 'string',
        },
        {
          name: 'uses',
          type: 'string',
          isOptional: true,
        },
      ],
    }),
  ],
});
