import React, { useEffect, useState } from "react";
import css from "./ProfileInfoComponent.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";

function ProfileInfoComponent() {
  const userId = useAppSelector((state: RootState) => state.user.userId);
  const navigate = useNavigate();
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );
  const dispatch = useAppDispatch();
  const [data, setData] = useState<{
    email: string;
    userType: string;
    status: string;
    createdAt: string;
  }>({ email: "", userType: "", status: "", createdAt: "" });
  useEffect(() => {
    (async () => {
      try {
        dispatch(userActions.isAuth());
        const response = await fetch(
          `http://localhost:9000/api/auth/getuser/?id=${userId}`,
          {
            credentials: "include",
          }
        );
        const resData = await response.json();
        setData(resData.data);
        if (response.status === 400) {
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Nie jesteś zalogowany",
            })
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (err) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Brak połączenia z serwerem",
          })
        );
      }
    })();
  }, []);

  if (!userLoggedIn) return <NotAuthComponent />;
  return (
    <div className={css.profileContainer}>
      <div className={css.title}>Profil</div>
      <div className={css.left}>e-mail</div>
      <div className={css.right}>{data.email}</div>
      <div className={css.left}>Imię i nazwisko</div>
      <div className={css.right}>----</div>
      <div className={css.left}>Typ uzytkownika</div>
      <div className={css.right}>{data.userType}</div>
      <div className={css.left}>Status</div>
      <div className={css.right}>{data.status}</div>
      <div className={css.left}>Data utworzenia</div>
      <div className={css.right}>{data.createdAt}</div>
    </div>
  );
}

export default ProfileInfoComponent;
