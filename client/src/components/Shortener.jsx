import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  conatiner: {
    height: "80vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: "6em",
      height: "60vh",
    },
  },
  paper: {
    margin: "auto",
    width: "80%",
    marginTop: "10%",
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0",
      padding: theme.spacing(3),
      boxSizing: "border-box",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexFlow: "column",
    },
  },
  text: {
    width: "80%",
    marginRight: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: "0px",
    },
  },
  btn: {
    textTransform: "none",
    fontSize: "16px",
    height: "55px",
  },
  link: {
    display: "block",
    textAlign: "center",
  },
}));

const Shortener = () => {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const matches = useMediaQuery("(min-width:800px)");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "https://url-shortener-02.herokuapp.com/api/v1/shorten",
        { longUrl: url },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      setShortUrl(data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Container>
      <Grid className={classes.conatiner} container direction="column">
        <Grid
          container
          md={12}
          item
          direction={matches ? "row" : "column"}
          justifyContent="center"
          alignItems={matches ? "center" : "strech"}
        >
          <Grid md={12} item>
            <Paper elevation={4} className={classes.paper}>
              <div className={classes.flex}>
                <TextField
                  className={classes.text}
                  variant="outlined"
                  name="url"
                  label="Enter The Url ....."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button className={classes.btn} size="large" variant="contained" onClick={handleSubmit}>
                  Get Short Url
                </Button>
              </div>
              <Box mt={2} mx="auto">
                <Typography variant="subtitle2">
                  {shortUrl && (
                    <Link className={classes.link} rel="noopener" target="_blank" href={shortUrl}>
                      =={">"} {`${shortUrl}`}
                    </Link>
                  )}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shortener;
