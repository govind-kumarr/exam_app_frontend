import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#fab63b",
    },
    secondary: {
      main: "#FA812F",
    },
    error: {
      main: "#FA4032",
    },
    success: {
      main: "#f9a818",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
  },
});

export { theme };
