import { useEffect, useReducer, useRef } from "react";
import { UIActions } from "../store/UI";
import store from "../store";
import { useNavigate } from "react-router-dom";

interface State<T> {
  responseData?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> = { type: "loading" } | { type: "fetched"; payload: T } | { type: "error"; payload: Error };

export function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});
  const navigate = useNavigate();
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    responseData: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, responseData: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;
    const fetchData = async () => {
      dispatch({ type: "loading" });
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          if (response.status === 500 || response.status === undefined) {
            store.dispatch(
              UIActions.showWarning({
                flag: "red",
                text: "Błąd połączenia z serwerem",
              })
            );
          }
          const responseData = await response.json();
          if (response.status === 401) {
            responseData.message = "Nie jesteś zalogowany";
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
          if (response.status === 403) responseData.message = "Nie masz uprawnień";
          if (response.status === 500) responseData.message = "Błąd serwera";

          store.dispatch(UIActions.showWarning({ flag: "red", text: responseData.message }));
          const error = new Error(responseData.message);
          error.statusCode = response.status;
          throw error;
        }
        const responseData = (await response.json()) as T;
        cache.current[url] = responseData;
        if (cancelRequest.current) return;
        dispatch({ type: "fetched", payload: responseData });
      } catch (error) {
        if (cancelRequest.current) return;
        store.dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Błąd połączenia z serwerem",
          })
        );
        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}
