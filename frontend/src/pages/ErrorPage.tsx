import React from "react";

function ErrorPage() {
  return (
    <div
      style={{
        fontSize: "2rem",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        position: "absolute",
        borderRadius: "0.2rem",
        boxShadow: "3px 3px 13px -4px rgba(66, 68, 90, 1)",
        padding: "3rem",
      }}
    >
      Ta strona nie istnieje{" "}
      <span
        style={{
          color: "red",
          fontSize: "3rem",
          marginLeft: "1rem",
        }}
      >
        Error 404
      </span>
    </div>
  );
}

export default ErrorPage;
