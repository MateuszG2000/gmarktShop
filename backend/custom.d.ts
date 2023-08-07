import { Request } from 'express';
export interface RequestUser extends Request {
  user: User;
}
export interface fileRequest extends Request {
  file?: FileI;
}
interface FileI {
  fieldname: String;
  originalname: String;
  mimetype: String;
  destination: String;
  filename: String;
  path: String;
  size: Number;
}
