import React from "react";
import css from "./ContactFromIconComponent.module.scss";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";

function ContactFromIconComponent() {
  return (
    <ul className={css.list}>
      <li>
        <AiOutlineHome />
        <p>
          ul. Tartaczna 123
          <br />
          11-111 Białystok
        </p>
      </li>
      <li>
        <BsFillTelephoneFill />
        <p>222-444-999</p>
      </li>
      <li>
        <AiOutlineMail />
        <p>gmark@info.pl</p>
      </li>
    </ul>
  );
}

export default ContactFromIconComponent;
