import { useEffect } from "react";
import { useAppDispatch } from "../store/appHooks";

export default function useOutsideClick(ref: any, disp: Function) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(disp());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dispatch, disp]);
}
