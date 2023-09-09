import React, { useRef, useState } from "react";
import css from "./SearchComponent.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/appHooks";
import { useDispatch } from "react-redux";
import { UIActions } from "../../store/UI";
import useOutsideClick from "../../utils/useOutsideClick";
const debounce = require("lodash.debounce");

function SearchComponent() {
  const searchVisible = useAppSelector(
    (state: RootState) => state.UI.searchVisible
  );
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, UIActions.toggleSearch);
  const searchHandler = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIsLoading(false);
        dispatch(UIActions.toggleSearch(false));
      } else {
        setIsLoading(true);
        dispatch(UIActions.toggleSearch(true));
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
          className={`${searchVisible ? css.first : css.default}`}
          type="text"
          placeholder="Wyszukaj..."
          onChange={searchHandler}
        />
      </form>
      {searchVisible && (
        <div className={css.resultContainer}>
          <div className={css.centerBox} ref={wrapperRef}>
            {products.slice(0, 5).map((item, index) => {
              return (
                <Link key={item._id} to={`product/${item._id}`}>
                  <div
                    className={`${css.result} ${css.inside} ${
                      index + 1 === products.length || index === 4
                        ? css.last
                        : ""
                    }`}
                  >
                    <img
                      className={css.image}
                      src={`http://localhost:9000/api/images/${item.image}`}
                      alt={String(item.name)}
                    ></img>
                    <span className={css.title}>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {isLoading && (
        <div className={css.resultContainer}>
          <div className={css.centerBox}>
            <div className={`${css.result} ${css.inside} ${css.last}`}>
              <span className={css.title}>Szukam...</span>
            </div>
          </div>
        </div>
      )}
      {products.length === 0 && searchVisible && (
        <div className={css.resultContainer}>
          <div className={css.centerBox}>
            <div className={`${css.result} ${css.inside} ${css.last}`}>
              <span className={css.title}>Brak produktu</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
