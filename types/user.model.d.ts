import { Date } from "mongoose";

// a mongoose user model attributes interface
export declare interface IUser {
  fullname: string;
  username: string;
  email: string;
  password: string;
  birthday: Date;
  avatar: string;
  emailVerified: boolean;
  role: string[];
  [key: string]: any;
}

// a mongoose user model methods interface
export declare interface IUserMethods {
  // eslint-disable-next-line no-unused-vars
  validatePassword(password: string): Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  hasRole(role: string): boolean;
}
