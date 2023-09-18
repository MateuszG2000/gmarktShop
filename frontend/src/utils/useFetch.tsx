import { useEffect, useReducer, useRef } from "react";
import { UIActions } from "../store/UI";
import store from "../store";

interface State<T> {
  responseData?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> {
  const cache = useRef<Cache<T>>({});
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    responseData: undefined,
  };

  // Keep state logic separated
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
    // Do nothing if the url is not given
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      // If a cache exists for this url, return it
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
          console.log(response);
          const responseData = await response.json();
          store.dispatch(
            UIActions.showWarning({ flag: "red", text: responseData.message })
          );
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
