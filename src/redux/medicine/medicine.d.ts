export interface MedicineSchedule {
  date: string;
  notificationId: Date;
}

export interface Medicine {
  id: string;
  notificationId: string;
  name: string;
  type: 'pill' | 'drop' | 'syrup' | 'injection';
  frequency: number;
  schedules: MedicineSchedule[];
  singleDose: string;
}
