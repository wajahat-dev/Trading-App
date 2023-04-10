import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(invest, profit) {
  return { invest, profit };
}

const rows = [
  createData('$5', '3%'),
  createData('$10', '3%'),
  createData('$20', '3%'),
  createData('$50', '3%'),
  createData('$100', '3%'),
  createData('$200', '4%'),
  createData('$500', '5%'),
  createData('$1000', '5.5%'),
  createData('$2000', '6%'),
  createData('$50000', '6.5%'),
];

export default function InvestTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Depoist</TableCell>
            <TableCell align="center">Daily profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.invest} >
              <TableCell component="th" scope="row" align="center">
                {row.invest}
              </TableCell>
              <TableCell align="center" style={{backgroundColor: "#2196f3", color: "white"}}> {row.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
