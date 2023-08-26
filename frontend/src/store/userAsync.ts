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
        await fetch("http://localhost:9000/api/auth/logout", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      dispatch(userActions.logOut());
      dispatch(UIActions.showWarning({ flag: "green", text: "Wylogowano" }));

      console.log(res.message); ///////logout action
    } catch (err: any) {
      console.log(err.message);
      dispatch(
        UIActions.showWarning({ flag: "red", text: "Coś poszło nie tak :(" })
      );
    }
  };
};
