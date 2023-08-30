import React, { useState } from "react";
import css from "./SearchComponent.module.scss";
const debounce = require("lodash.debounce");

function SearchComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchHandler = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value == "") {
        setIsSearching(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setIsSearching(true);
      }

      const response = await (
        await fetch(
          `http://localhost:9000/api/product/?name=${e.target.value}&fields=name,_id,image`
        )
      ).json();
      setProducts(response.data);
      setIsLoading(false);
    },
    500
  );
  return (
    <div className={css.search}>
      <form action="#">
        <input
          className={`${isSearching ? css.first : css.default}`}
          type="text"
          placeholder="Wyszukaj..."
          onChange={searchHandler}
          onBlur={() => {
            setIsSearching(false);
          }}
        />
      </form>
      {isSearching && (
        <div className={css.resultContainer}>
          {products.slice(0, 5).map((item, index) => {
            return (
              <div
                key={item._id}
                className={`${css.result} ${css.inside} ${
                  index + 1 === products.length || index === 4 ? css.last : ""
                }`}
              >
                <img
                  className={css.image}
                  src={`http://localhost:9000/api/images/${item.image}`}
                  alt={String(item.name)}
                ></img>
                <span className={css.title}>{item.name}</span>
              </div>
            );
          })}
        </div>
      )}
      {isLoading && (
        <div className={css.resultContainer}>
          <div className={`${css.result} ${css.inside} ${css.last}`}>
            <span className={css.title}>Szukam...</span>
          </div>
        </div>
      )}
      {products.length === 0 && isSearching && (
        <div className={css.resultContainer}>
          <div className={`${css.result} ${css.inside} ${css.last}`}>
            <span className={css.title}>Brak produktu</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
