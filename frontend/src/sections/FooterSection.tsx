import React from "react";
import FooterComponent from "../components/FooterComponents/FooterComponent";
import LogoComponent from "../components/HeaderComponents/LogoComponent";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiFillTwitterCircle,
  AiOutlineMail,
  AiOutlineHome,
} from "react-icons/ai";

import {
  BsFillTelephoneFill,
  BsArrowReturnLeft,
  BsWallet2,
} from "react-icons/bs";
import { PiPaypalLogoBold } from "react-icons/pi";
import { BiLogoVisa } from "react-icons/bi";
import { FaCcMastercard, FaGooglePay } from "react-icons/fa";
import css from "./FooterSection.module.scss";
function FooterSection() {
  return (
    <div className={css.FooterSection}>
      <FooterComponent title="">
        <LogoComponent type="logoSmall" />
        <p className={css.socialIcons}>
          <AiOutlineInstagram />
          <AiOutlineFacebook />
          <AiFillTwitterCircle />
        </p>
        <p style={{ fontSize: "1rem" }}>
          Copyright © 2027 by Gsklep, All rights reserved.
        </p>
      </FooterComponent>
      <FooterComponent title="O nas">
        <p>
          Jesteśmy firmą działającą od 2019 roku. Zajmujemy się sprzedażą
          akcesoriów komputerowych oraz elektroniki. Nasza oferta obejmuje
          szeroki wybór akcesoriów, które umożliwiają ulepszanie i
          personalizację Twojego komputera.
        </p>
      </FooterComponent>
      <FooterComponent title="Kontakt">
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
            <p>gsklep@info.pl</p>
          </li>
        </ul>
      </FooterComponent>
      <FooterComponent title="Zwroty">
        <ul className={css.list}>
          <li>
            <BsArrowReturnLeft />
            <p>14 dni na zwort towaru</p>
          </li>
          <li>
            <BsWallet2 />
            <p>Bezpłatny zwrot</p>
          </li>
        </ul>
      </FooterComponent>
      <FooterComponent title="Płatności">
        <div className={css.payments}>
          <PiPaypalLogoBold />
          <BiLogoVisa />
          <FaCcMastercard />
          <FaGooglePay />
        </div>
      </FooterComponent>
    </div>
  );
}

export default FooterSection;
