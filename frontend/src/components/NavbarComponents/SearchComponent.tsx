import React from "react";
import css from "./SearchComponent.module.scss";
function SearchComponent() {
  return (
    <div className={css.search}>
      <form action="#">
        <input id="search" type="text" placeholder="Wyszukaj..." />
      </form>
    </div>
  );
}

export default SearchComponent;
