interface Error {
  statusCode: number;
  data: string;
}
interface User {
  _id: string;
  email: string;
  name?: string;
  password: string;
  save(): Promise;
}
interface onSave {
  _id: string;
}
interface authResponse extends express.Response {
  userID: string;
}
