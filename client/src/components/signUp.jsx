import {
  Container,
  Paper,
  TextField,
  makeStyles,
  Grid,
  Button,
  Typography,
  Box,
  Link,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { ReactComponent as SignUpSvg } from "../images/Sign_in.svg";
import { useSnackbar } from "notistack";
import axios from "axios";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
    boxSizing: "border-box",
    padding: "1px",
    [theme.breakpoints.down("sm")]: {
      height: "140vh",
      paddingBottom: "3em",
    },
  },
  container: {
    maxHeight: "100vh",
    marginTop: "10%",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxHeight: "120vh",
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
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  btn: {
    marginTop: theme.spacing(2),
    width: "40%",
  },
  options: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const validationSchema = yup.object({
  username: yup.string().min(4, "Username should be of minimum 4 characters length").required("Username is required"),
  email: yup.string().email("Enter a valid Email").required("Email is required"),
  password: yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm your password"),
});

const SignUp = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post("https://url-shortener-02.herokuapp.com/api/v1/auth/signUp", {
        email: values.email,
        username: values.username,
        password: values.password,
      });
      enqueueSnackbar(data.message, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box className={classes.page}>
      <Container maxWidth="md">
        <Paper elevation={4} className={classes.container}>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography color="textSecondary" className={classes.title} variant="h3">
            Sign Up
          </Typography>
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <Grid sm={12} md={6} item>
              <SignUpSvg className={classes.img} />
            </Grid>
            <Grid sm={12} md={6} item>
              <form className={classes.form} onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <TextField
                  required
                  fullWidth
                  className={classes.text}
                  variant="filled"
                  id="username"
                  name="username"
                  label="UserName"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
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
                <TextField
                  required
                  fullWidth
                  className={classes.text}
                  variant="filled"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                  helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
                <Button className={classes.btn} size="large" color="primary" type="submit" variant="contained">
                  Submit
                </Button>
              </form>
              <Typography variant="body1" className={classes.options}>
                Already have an account?{" "}
                <Link component={RouterLink} to="/Login">
                  Login.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
