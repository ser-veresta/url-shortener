import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "650px",
  },
}));

const TableComp = ({ urls = [] }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <TableContainer component={Paper}>
      <Table size={matches ? "medium" : "small"} className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Long Url</TableCell>
            <TableCell>Short Url</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>No.of times visited</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((ele, i) => (
            <TableRow key={ele._id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{ele.longUrl}</TableCell>
              <TableCell>{ele.shortUrl}</TableCell>
              <TableCell>{ele.date.split(" ").join("-")}</TableCell>
              <TableCell>{ele.createdBy}</TableCell>
              <TableCell>{ele.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
