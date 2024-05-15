import { useEffect, type FC } from "react";
import { PageWrapper } from "./components/PageWrapper";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { FlashPage } from "./pages/FlashPage";
import { CameraPage } from "./pages/CameraPage";
import { HomePage } from "./pages/HomePage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setDarkMode } from "./store/appSlice";
import { SettingsPage } from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <HomePage />
      </PageWrapper>
    ),
  },
  {
    path: "/flash",
    element: (
      <PageWrapper>
        <FlashPage />
      </PageWrapper>
    ),
  },
  {
    path: "/camera",
    element: (
      <PageWrapper>
        <CameraPage />
      </PageWrapper>
    ),
  },
  {
    path: "/settings",
    element: (
      <PageWrapper>
        <SettingsPage />
      </PageWrapper>
    ),
  },
]);

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App: FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prefersDarkMode) {
      dispatch(setDarkMode(true));
    }
  }, [prefersDarkMode, dispatch, setDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
