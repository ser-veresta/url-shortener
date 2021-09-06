import { Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  conatiner: {
    height: "80vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: "4em",
      height: "60vh",
    },
  },
}));

const Count = ({ dayCount = 0, monthCount = 0 }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid className={classes.conatiner} container direction="column">
        <Grid container md={12} spacing={6} item justifyContent="center" alignItems="center">
          <Grid xs={12} md={4} item>
            <Card elevation={5}>
              <CardHeader title="Url's Created" subheader="n/day" />
              <CardContent>
                <Typography variant="h6" component="p">
                  Count: {dayCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={2} item></Grid>
          <Grid xs={12} md={5} item>
            <Card elevation={4}>
              <CardHeader title="Url's Created" subheader="n/month" />
              <CardContent>
                <Typography variant="h6" component="p">
                  Count: {monthCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Count;
