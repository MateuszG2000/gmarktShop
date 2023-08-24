import { Middleware } from "redux";

const isAuth: Middleware = (store) => (next) => (action) => {
  console.log("akcjaaaaaaaaaaaaaa1a1ą");
  console.log(action.type);
  next(action);
};

export default isAuth;
