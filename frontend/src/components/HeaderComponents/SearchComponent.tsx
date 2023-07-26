import React from "react";
import css from "./SearchComponent.module.scss";
// import monitor from "../../Photos/i-xiaomi-mi-curved-gaming-34-bhr4269gl.jpg.webp";
function SearchComponent() {
  return (
    <div className={css.search}>
      <form action="#">
        <input
          className={`${css.default} ${css.first}`}
          // className={css.first}
          type="text"
          placeholder="Wyszukaj..."
        />
      </form>
      {/* <div className={css.resultContainer}>
        <div className={`${css.result} ${css.inside}`}>
          <img className={css.img} src={monitor} alt="abc"></img>
          <span className={css.title}>Xiaomi Mi Curved Gaming s</span>
        </div>
        <div className={`${css.result} ${css.inside}`}>
          <img className={css.img} src={monitor} alt="abc"></img>
          <span className={css.title}>Xiaomi Mi Curved Gaming s</span>
        </div>
        <div className={`${css.result} ${css.inside}`}>
          <img className={css.img} src={monitor} alt="abc"></img>
          <span className={css.title}>Xiaomi Mi Curved Gaming s</span>
        </div>
        <div className={`${css.result} ${css.last}`}>
          <img className={css.img} src={monitor} alt="abc"></img>
          <span className={css.title}>Xiaomi Mi Curved Gaming s</span>
        </div>
      </div> */}
    </div>
  );
}

export default SearchComponent;
