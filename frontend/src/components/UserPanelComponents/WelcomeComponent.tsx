import React from "react";
import LogoComponent from "../HeaderComponents/LogoComponent";

function WelcomeComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        gap: "2rem",
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
        Panel użytkownika
      </div>
    </div>
  );
}

export default WelcomeComponent;
