import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './themeConfig'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import AccountManager from './components/account/AccountManager';
import Match from './components/match/Match'


function App() {

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/match" component={Match} />
            <Route path="/account" component={AccountManager} />
            <Redirect from="/" to="/account" />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;
