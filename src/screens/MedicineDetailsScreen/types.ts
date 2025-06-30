export type medicineDataTypes = {
  category: string;
  expiry_date: string;
  id: string;
  medicine_name: string;
  quantity: string;
  uses: string;
  notes: string;
};

export const initialValues: medicineDataTypes = {
  category: '',
  expiry_date: '',
  id: '',
  medicine_name: '',
  quantity: '',
  uses: '',
  notes: '',
};
