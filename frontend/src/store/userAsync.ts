import { Dispatch } from "react";
import { userActions } from "./user";
import Cookies from "js-cookie";
import { UIActions } from "./UI";
type userAction = { type: string };

export const onLogOut = () => {
  return async (dispatch: Dispatch<userAction>) => {
    Cookies.remove("AuthConfirm");
    try {
      const res = await (
        await fetch(`${process.env.REACT_APP_URL}/api/auth/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      dispatch(userActions.logOut());
      dispatch(UIActions.showWarning({ flag: "green", text: "Wylogowano" }));
    } catch (err: any) {
      dispatch(
        UIActions.showWarning({ flag: "red", text: "Coś poszło nie tak :(" })
      );
    }
  };
};
