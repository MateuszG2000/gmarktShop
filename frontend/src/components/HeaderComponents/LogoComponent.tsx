import { Link } from "react-router-dom";
import css from "./LogoComponent.module.scss";
function LogoComponent(props: { type: string }) {
  return (
    <div
      className={props.type === "logoNavbar" ? css.logoNavbar : css.logoSmall}
    >
      <Link to="/">
        <span>G</span>sklep
      </Link>
    </div>
  );
}

export default LogoComponent;
