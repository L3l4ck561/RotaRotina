import { createTheme } from "@mui/material/styles";

export const getMuiTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#3b82f6",
      },
    },
    shape: {
      borderRadius: 12,
    },
  });
