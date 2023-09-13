interface Error {
  statusCode: number;
  data: string;
  message?: string;
}
interface User {
  _id: string;
  email: string;
  password?: string;
  save(): Promise;
  userType: string;
  userData: Address;
}
interface onSave {
  _id: string;
}
interface authResponse extends express.Response {
  userID: string;
}
interface ExpressFunction {
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void>;
}
interface ExpressProps {
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
}
interface Address {
  firstName: String;
  lastName: String;
  street: String;
  zipCode: String;
  houseNumber: String;
  city: String;
  phoneNumber: String;
  email: String;
}
