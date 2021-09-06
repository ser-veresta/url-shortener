import { Box, Button, Container, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ForgotPasswordSVG } from "../images/Forgot_password.svg";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
    boxSizing: "border-box",
    padding: "1px",
    [theme.breakpoints.down("sm")]: {
      height: "110vh",
      paddingBottom: "3em",
    },
  },
  container: {
    maxHeight: "100vh",
    marginTop: "10%",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: "3em",
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
    fontWeight: theme.typography.fontWeightMedium,
    borderBottom: `2px ${theme.palette.primary.light} solid`,
  },
  img: {
    width: "100%",
    height: "50vh",
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
    },
  },
  text: {
    marginBottom: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  btn: {
    width: "40%",
  },
  options: {
    marginLeft: theme.spacing(3),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }
    try {
      const { data } = await axios.post("https://url-shortener-02.herokuapp.com/api/v1/auth/forgotPassword", { email });

      enqueueSnackbar(data.message, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: "error",
      });
    }
    setError(false);
    setEmail("");
  };

  return (
    <Box className={classes.page}>
      <Container maxWidth="md">
        <Paper elevation={4} className={classes.container}>
          <Typography color="textSecondary" className={classes.title} variant="h3">
            Forgot Password
          </Typography>
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <Grid sm={12} md={6} item>
              <ForgotPasswordSVG className={classes.img} />
            </Grid>
            <Grid sm={12} md={6} item>
              <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                  required
                  fullWidth
                  className={classes.text}
                  variant="filled"
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  helperText={error && "Email is required"}
                />
                <Button className={classes.btn} size="large" color="primary" type="submit" variant="contained">
                  Submit
                </Button>
              </form>
              <Typography variant="body1" className={classes.options}>
                Dont have an account?{" "}
                <Link component={RouterLink} to="/SignUp">
                  Sign Up.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
