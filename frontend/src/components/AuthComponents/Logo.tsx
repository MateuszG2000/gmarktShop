import css from "./Logo.module.scss";
function Logo() {
  return (
    <p className={`${css.logo} ${css.flexcenter}`}>
      <span>G</span>markt
    </p>
  );
}

export default Logo;
