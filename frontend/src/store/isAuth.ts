import Cookies from "js-cookie";
import { Middleware } from "redux";
import { userActions } from "./user";

const isAuth: Middleware = (store) => (next) => (action) => {
  if (
    Cookies.get("AuthConfirm") === undefined &&
    store.getState().user.loggedIn &&
    action.type !== "user/logOut"
  ) {
    store.dispatch(userActions.logOut());
    console.log("Niezalogowany");
  } else {
  }

  next(action);
};

export default isAuth;
