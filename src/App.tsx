import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import UseLocalStorage from "@hooks/useLocalStorage";
import routes from "@routes/router";

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const [theme] = UseLocalStorage("color-theme", "light");

  const themeLight = createTheme({
    palette: {
      background: {
        default: "#e4f0e2",
      },
      primary: {
        main: "#ff0000",
        contrastText: "#fff",
      },
    },
  });

  const themeDark = createTheme({
    palette: {
      background: {
        default: "#222222",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
      <div>
        {!loading && (
          <div>
            <RouterProvider router={routes} fallbackElement />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
