import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SnackbarProvider } from "notistack";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { useAppSelector } from "./hooks/redux";
import { router } from "./router";
import { store } from "./store/store";
import { darkTheme, lightTheme } from "./themes";

export const App = (): ReactNode => {
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
            <TanStackRouterDevtools router={router} />
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeWrapper>
    </Provider>
  );
};

export const ThemeWrapper = ({ children }: { children: ReactNode }): ReactNode => {
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
