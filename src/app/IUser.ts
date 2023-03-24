import {Role} from "./role";


export interface IUser {
  username : string;
  password : string;
  confirmPassword : string;
  firstName : string;
  lastName : string;
  email : string;
  telefono : string;
  role: Role;
  estado: boolean;
}


