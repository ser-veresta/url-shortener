import { AppBar, Avatar, Button, makeStyles, Tab, Tabs, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    justifyContent: "space-between",
  },
  tab: {
    flexGrow: 1,
    marginLeft: "200px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: "500px",
      flexGrow: 0,
      flexShrink: 1,
    },
  },
  btn: {
    borderRadius: "25px",
    marginRight: "1em",
    [theme.breakpoints.down("sm")]: {
      marginRight: "1em",
      fontSize: "10px",
    },
  },
  avatar: {
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: "1em",
    },
  },
}));

const NavBar = ({ user, setUser, selectedTab, setSelectedTab, TabIndex }) => {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(min-width:800px)");

  const handleChange = (e, newValue) => {
    history.push(`/Url/${TabIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    setUser({});
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.appBar}>
        {!user ? <Typography variant={matches ? "h4" : "h5"}>Shortyy</Typography> : <></>}
        {user && (
          <Tabs className={classes.tab} value={selectedTab} onChange={handleChange}>
            <Tab label="Count" />
            <Tab label="Shortener" />
            <Tab label="Table" />
          </Tabs>
        )}
        {user ? (
          <>
            <Button
              onClick={handleLogout}
              className={classes.btn}
              size={matches ? "medium" : "small"}
              variant="contained"
              disableElevation
            >
              Logout
            </Button>
            <Avatar className={classes.avatar}>{user.username[0]}</Avatar>
            {matches && <Typography variant="h5">{user.username}</Typography>}
          </>
        ) : (
          <div>
            <Button
              onClick={() => history.push("/Login")}
              className={classes.btn}
              size={matches ? "medium" : "small"}
              variant="contained"
              disableElevation
            >
              Login
            </Button>
            <Button
              onClick={() => history.push("/SignUp")}
              className={classes.btn}
              size={matches ? "medium" : "small"}
              variant="contained"
              disableElevation
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
