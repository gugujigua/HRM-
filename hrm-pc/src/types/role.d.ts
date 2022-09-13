export interface AuthType {
  id: number;
  menu: string;
  route_name: string;
  pid: number;
  buttons: string[];
  selectButtons: string[];
  children?: AuthType[];
}
export interface RoleType {
  id?: number;
  roleName: string;
  description: string;
}
