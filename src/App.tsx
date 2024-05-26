import type { FC, PropsWithChildren } from "react";
import { CssBaseline, GlobalStyles, ThemeProvider, styled } from "@mui/material";
import { RouterProvider } from "react-router";
import { darkTheme, lightTheme } from "./themes";
import { router } from "./router";
import { useAppSelector } from "./hooks";
import { SnackbarProvider, MaterialDesignContent } from "notistack";
import { Provider } from "react-redux";
import { store } from "./store/store";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#2D7738',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));

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
        <SnackbarProvider
          maxSnack={3}
          dense
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
          }}
        >
          <RouterProvider router={router} />
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
