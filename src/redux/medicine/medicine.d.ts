export interface MedicineSchedule {
  name: string
  date: Date
}

export interface Medicine {
  name: string;
  type: 'pill' | 'drop' | 'syrup' | 'injection';
  when: string;
  medicineDose: string;
  comment: string;
  schedules: MedicineSchedule[];
}

export interface task {
  id: string;
  selectedDate: Date;
  stared: boolean;
  taskDescription: string;
  taskTitle: string;
  completed: boolean;
}

export interface taskList {
  [key: string]: {ongoingTasks: task[]; completedTasks?: task[]};
}