import { createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[900]
        }
    }
});

export default theme;