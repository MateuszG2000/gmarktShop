import { Dispatch } from "react";
import { userActions } from "./user";
import Cookies from "js-cookie";
type userAction = { type: string };

export const onLogOut = () => {
  return async (dispatch: Dispatch<userAction>) => {
    Cookies.remove("AuthConfirm");
    dispatch(userActions.logOut());
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
      console.log(res.message); ///////logout action
    } catch (err: any) {
      console.log(err.message);
    }
  };
};
