import { Container, Paper, TextField, makeStyles, Grid, Button, Typography, Box, Link } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { ReactComponent as LoginSvg } from "../images/Login.svg";
import { useEffect } from "react";
import axios from "axios";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
    boxSizing: "border-box",
    padding: "1px",
    [theme.breakpoints.down("sm")]: {
      height: "130vh",
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

const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const classes = useStyles();
  const { activationToken } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    const activation = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/auth/activate/${activationToken}`);

        enqueueSnackbar(data.message, {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(error.response.data.error, {
          variant: "error",
        });
      }
    };
    activationToken && activation();
  }, [activationToken, enqueueSnackbar]);

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", { email, password });

      localStorage.setItem("token", data.token);

      history.push("/Url");
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box className={classes.page}>
      <Container maxWidth="md">
        <Paper elevation={4} className={classes.container}>
          <Typography color="textSecondary" className={classes.title} variant="h3">
            Login
          </Typography>
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <Grid sm={12} md={6} item>
              <LoginSvg className={classes.img} />
            </Grid>
            <Grid sm={12} md={6} item>
              <form className={classes.form} onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <TextField
                  required
                  fullWidth
                  className={classes.text}
                  variant="filled"
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  required
                  fullWidth
                  className={classes.text}
                  variant="filled"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
              <Typography variant="body1" className={classes.options}>
                <Link component={RouterLink} to="/ForgotPassword">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
