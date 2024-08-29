// react
// components
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// styles constants and helpers

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import RouteScreen from "./screen/Routing/Route";

function App() {
  const customTheme = createTheme({
    typography: {
      fontFamily: ["Noto Sans", "sans-serif"].join(","),
    },

    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <RouteScreen />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
