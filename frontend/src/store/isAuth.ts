import Cookies from "js-cookie";
import { Middleware } from "redux";
import { onLogOut } from "./userAsync";

const isAuth: Middleware = (store) => (next) => (action) => {
  if (
    Cookies.get("AuthConfirm") === undefined &&
    store.getState().user.loggedIn &&
    action.type !== "user/logOut"
  ) {
    store.dispatch<any>(onLogOut());
  }
  next(action);
};

export default isAuth;
