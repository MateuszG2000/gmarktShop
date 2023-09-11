import React, { useEffect, useState } from "react";
import css from "./ProfileInfoComponent.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";
import formatDate from "../../utils/formatDate";

function ProfileInfoComponent() {
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
        const response = await fetch(`http://localhost:9000/api/auth/getuser`, {
          credentials: "include",
        });
        const resData = await response.json();
        if (!response.ok) {
          console.log(response);
          const error: Error = new Error(
            `Request failed with status ${response.status}`
          );
          error.statusCode = response.status;
          throw error;
        } else {
          const date = new Date(resData?.data?.createdAt);
          resData.data.createdAt = formatDate(date);
          setData(resData.data);
        }
      } catch (err: any) {
        console.log(err);
        if (err.statusCode === 401) {
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Nie jesteś zalogowany",
            })
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Błąd połączenia z serwerem",
            })
          );
      }
    })();
  }, [dispatch, navigate]);
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
