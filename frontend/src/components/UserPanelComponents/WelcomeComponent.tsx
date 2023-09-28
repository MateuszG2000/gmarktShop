import React from "react";
import LogoComponent from "../HeaderComponents/LogoComponent";
import { useAppSelector } from "../../store/appHooks";

function WelcomeComponent() {
  const userType = useAppSelector((state: RootState) => state.user.type);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <LogoComponent type="logoNavbar" />
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: "300",
          letterSpacing: "0.4rem",
        }}
      >
        Panel {userType === "admin" ? "administratora" : "użytkownika"}
      </div>
    </div>
  );
}

export default WelcomeComponent;
