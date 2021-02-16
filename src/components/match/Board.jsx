import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "auto"
  },
  cell: {
    height: '15px',
    width: '15px',
    border: '1px solid'
  },
}));


const Board = (props) => {

    const classes = useStyles();
    const { match } = props;

    console.log(match)
    return (
        <table className={classes.table}><tbody>
          {
            match && match.board.map((row, index) =>
              <tr key={index}>{
                row.map((cell, index) => 
                  <td className={classes.cell} key={index}></td>
                )
              }</tr>
            )
          }
        </tbody></table>
    )
}

export default Board;