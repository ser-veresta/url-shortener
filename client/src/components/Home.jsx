import { Button, Container, Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { ReactComponent as SiteStats } from "../images/Site_stats.svg";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  heading: {
    marginTop: "1em",
    marginBottom: "0.2em",
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
  body: {
    marginBottom: "3em",
    fontWeight: theme.typography.fontWeightMedium,
  },
  btn: {
    borderRadius: "25px",
    fontSize: theme.typography.fontSize * 1.4,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.fontSize,
      marginBottom: "3em",
    },
  },
  img: {
    width: "80%",
    marginLeft: "5em",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "2em",
      marginTop: "10em",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    localStorage.getItem("token") && history.push("/Url");
  }, [history]);

  return (
    <>
      <NavBar />
      <Container>
        <Grid
          className={classes.container}
          container
          alignContent="center"
          justifyContent="center"
          spacing={matches ? 3 : 1}
          direction="row-reverse"
        >
          <Grid sm={12} md={6} item>
            <SiteStats className={classes.img} />
          </Grid>
          <Grid sm={12} md={6} item>
            <Typography className={classes.heading} variant={matches ? "h2" : "h3"}>
              Big Links? Try shortening it.
            </Typography>
            <Typography color="textSecondary" className={classes.body} variant={matches ? "body1" : "body2"}>
              This is more than just shorter links, Build your brand's recognition and get detailed insights on how your
              links are performing.
            </Typography>
            <Button
              color="primary"
              className={classes.btn}
              variant="contained"
              size={matches ? "large" : "medium"}
              endIcon={<ArrowForward />}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
