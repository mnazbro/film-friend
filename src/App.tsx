import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import type { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { useAppSelector } from "./hooks/redux";
import { router } from "./router";
import { store } from "./store/store";
import { darkTheme, lightTheme } from "./themes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <GlobalStyles
          styles={{
            ".notistack-SnackbarContainer": {
              bottom: "calc(env(safe-area-inset-bottom) + 14px)",
            },
          }}
        />
        <SnackbarProvider maxSnack={3} dense>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeWrapper>
    </Provider>
  );
};

export const ThemeWrapper: FC<PropsWithChildren> = ({ children }) => {
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
