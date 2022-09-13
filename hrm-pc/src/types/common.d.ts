export interface addressType {
  province: string;
  city: string;
  area: string;
}
export interface cityListType {
  code: string;
  name: string;
  children?: cityListType[];
}
export interface OptionsType {
  status: number;
  name: string;
  val: number;
}
