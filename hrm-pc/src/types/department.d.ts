interface Department {
  pid: number;
  department: string;
  charge: number;
}
export interface departmentType extends Department {
  id: number;
  charge_id: number;
  charge_name?: string;
  children?: departmentType[];
}
