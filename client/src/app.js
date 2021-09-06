import { useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import { createTheme, IconButton, ThemeProvider, Zoom } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import { Close } from "@material-ui/icons";
import { SnackbarProvider } from "notistack";
import "./app.css";
import Url from "./components/Url";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const theme = createTheme({
  palette: {
    primary: teal,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  const ref = useRef();
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          ref={ref}
          maxSnack={1}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          TransitionComponent={Zoom}
          action={
            <IconButton onClick={() => ref.current.closeSnackbar()}>
              <Close />
            </IconButton>
          }
        >
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/SignUp" component={SignUp} />
              <Route exact path="/Login" component={Login} />
              <Route path="/Login/:activationToken" component={Login} />
              <Route path="/ForgotPassword" component={ForgotPassword} />
              <Route path="/ResetPassword/:resetToken" component={ResetPassword} />
              <Redirect exact from="/Url" to="/Url/Count" />
              <Route path="/Url/:tab" component={Url} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
