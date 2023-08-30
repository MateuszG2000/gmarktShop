import { useEffect } from "react";
import { useAppDispatch } from "../store/appHooks";
import { UIActions } from "../store/UI";

export default function useOutsideClick(ref: any) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(UIActions.toggleAccountExtendedInfo());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dispatch]);
}
