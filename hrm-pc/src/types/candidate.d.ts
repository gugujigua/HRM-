export interface BasecandidateType {
  name: string;
  phone: string;
  sex: numer;
  age: number;
  email: string;
  post_id: number;
  work_years: number;
  education: number;
  school: string;
  recent_work: string;
  recruiment_channels: number;
}
export interface candidateType extends BasecandidateType {
  id: number;
  post_name: string;
  status: number;
  department?: string;
  hiring_manager?: string;
  interview_time: number;
  interview_rounds: number;
  interviewer_id: number;
  interviewer: string;
  interview_method: number;
  create_time: number;
}
