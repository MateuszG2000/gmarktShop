import css from "./LogoComponent.module.scss";
function LogoComponent(props: { type: string }) {
  return (
    <span
      className={props.type === "logoNavbar" ? css.logoNavbar : css.logoSmall}
    >
      <span>G</span>sklep
    </span>
  );
}

export default LogoComponent;
