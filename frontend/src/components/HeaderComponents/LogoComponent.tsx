import css from "./LogoComponent.module.scss";
function LogoComponent(props: { type: string }) {
  return (
    <p className={props.type === "logoNavbar" ? css.logoNavbar : css.logoSmall}>
      <span>G</span>sklep
    </p>
  );
}

export default LogoComponent;
