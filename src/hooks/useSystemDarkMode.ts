import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { setDarkMode } from "../store/appSlice";
import { useAppDispatch } from "./useAppDispatch";

export function useSystemDarkMode() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prefersDarkMode) {
      dispatch(setDarkMode(true));
    }
  }, [prefersDarkMode, dispatch]);
}
