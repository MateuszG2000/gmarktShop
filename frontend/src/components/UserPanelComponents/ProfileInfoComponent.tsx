import React, { useEffect, useState } from "react";
import css from "./ProfileInfoComponent.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";

function ProfileInfoComponent() {
  const userId = useAppSelector((state: RootState) => state.user.userId);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/auth/getuser/?id=${userId}`,
          {
            credentials: "include",
          }
        );
        const resData = await response.json();
        setData(resData.data);
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
