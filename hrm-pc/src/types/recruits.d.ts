export interface PostType {
  id: number;
  jobtitle: string;
  department: string;
  city: {
    city: string;
    area: string;
    province: string;
  };
  recruitnum: number;
  workexp: number;
  education: number;
  salaryrange: {
    type: boolean;
    isdisabled: boolean;
    max: number;
    min: number;
    unit: string;
  };
  agereq: {
    type: boolean;
    max: number;
    min: number;
    isdisabled: boolean;
  };
  urgent: number;
  charge: string;
  chargeId: number;
  interviewer: string;
  interviewerId: number;
  state: number;
  lastpost: number;
}
