import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { API_URL } from '../../config'

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "auto"
  },
  cellDiscovered: {
    height: '15px',
    width: '15px',
    border: '1px solid',
    fontSize: '7px',
    textAlign: 'center',
  },
  cellMined: {
    height: '15px',
    width: '15px',
    border: '1px solid',
    fontSize: '7px',
    textAlign: 'center',
    backgroundColor: 'red',
  },
  cellUnclicked: {
    height: '15px',
    width: '15px',
    border: '1px solid',
    fontSize: '7px',
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    cursor:'pointer',
  }
}));


const Board = (props) => {

    const classes = useStyles();
    const { match, setMatch, token } = props;

    const [action, setAction] = React.useState("DIS");
    const handleChange = (event) => {
      setAction(event.target.value);
    };

    const click = (x, y, currentState) => {
      if ((action !== currentState) && (match.state === 'IP')){
        let resStatus = 0;
        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({"col":x,"row":y,"state":action}),
        };
        fetch(`${API_URL}/matches/${match.uuid}/click/`, requestOptions)
        .then(response => {
            resStatus = response.status;
            return response.json()
        })
        .then(response => {
            switch (resStatus) {
                case 200:
                    setMatch(response)
                    break;
                case 400:
                    let errors = [];
                    for (var k in response) {
                        if (response[k].length > 0){
                            if (k === "non_field_errors"){
                                errors.push(response[k][0])
                            }
                            else{
                                errors.push(`${k}: ${response[k][0]}`)
                            }
                            
                        }
                    }
                    console.error(errors)
                    break
                case 500:
                  console.error(['Server error, try again'])
                    break
                default:
                  console.error(['Unknown error, try again'])
                    break
            }
        })
        .catch(err => {
            console.error(err)
        })
        
      }
    }

    return (
      <Fragment>
        <div>
          Remaining mines: { match && match.remaining_flags}
          <FormControl className={classes.formControl}>
            <InputLabel id="select-action">Select action</InputLabel>
            <Select
              labelId="select-action"
              value={action}
              onChange={handleChange}
            >
              <MenuItem value={"DIS"}>Discover</MenuItem>
              <MenuItem value={"FLG"}>Flag</MenuItem>
              <MenuItem value={"UNK"}>Unknown</MenuItem>
              <MenuItem value={"UNC"}>Clear</MenuItem>
            </Select>
          </FormControl>
        </div>
        <table className={classes.table}><tbody>
          {
            match && match.board.map((row, row_index) =>
              <tr key={row_index}>{
                row.map((cell, col_index) => {
                  switch (cell.state) {
                    case "UNC":
                      return <td className={classes.cellUnclicked} 
                                key={col_index} 
                                onClick={() => click(row_index, col_index, cell.state)}></td>
                    case "FLG":
                      return <td className={classes.cellUnclicked} 
                                key={col_index} 
                                onClick={() => click(row_index, col_index, cell.state)}>F</td>
                    case "UNK":
                      return <td className={classes.cellUnclicked} 
                                key={col_index} 
                                onClick={() => click(row_index, col_index, cell.state)}>?</td>
                    case "DIS":
                      return <td className={classes.cellDiscovered} 
                                key={col_index}>{cell.number && cell.number}</td>
                    case "EXP":
                      return <td className={classes.cellMined} 
                                key={col_index}>X</td>
                    default:
                      return <td className={classes.cell} key={col_index}></td>
                  }
                })
              }</tr>
            )
          }
        </tbody></table>
        </Fragment>
    )
}

export default Board;