import React, { useEffect, useState } from "react";
import css from "./ShowUsersComponent.module.scss";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
function ShowUsersComponent() {
  const [userData, setUserData] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/auth`, {
          credentials: "include",
        });
        const resData = await response.json();
        setUserData(resData.user);
        setLoading(false);
      } catch (err) {}
    })();
  }, []);
  return (
    <div className={css.usersContainer}>
      <SpinnerComponent size={48} loading={loading} />
      {userData?.map((user) => (
        <div className={css.user} key={user._id}>
          <span className={css.id}>{user._id}</span>
          <span className={css.prop}>{user.email}</span>
          <span className={css.prop}>{user.status}</span>
          <span className={css.prop}>{user.userType}</span>
        </div>
      ))}
    </div>
  );
}

export default ShowUsersComponent;
