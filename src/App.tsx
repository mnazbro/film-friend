import { useState, type FC, useMemo, createContext } from "react";
import { PageWrapper } from "./pages/PageWrapper";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { FlashPage } from "./pages/FlashPage";
import { ColorModeContext } from "./context/ColorModeContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper>Hello!</PageWrapper>,
  },
  {
    path: "/flash",
    element: <PageWrapper><FlashPage /></PageWrapper>,
  },
]);

export const App: FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />;
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
