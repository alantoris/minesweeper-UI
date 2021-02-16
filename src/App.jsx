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

  const [token, setToken] = React.useState(localStorage.getItem("token"));

  const deleteToken = () => {
    localStorage.setItem('token', null);
    setToken(null)
  }

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route 
              path="/match/:uuid" 
              component={() => <Match token={token} deleteToken={deleteToken} />} 
            />
            <Route 
              path="/match" 
              component={() => <Match token={token} deleteToken={deleteToken} />} 
            />
            <Route 
              path="/account" 
              component={() => <AccountManager token={token} setToken={setToken} />} 
            />
            <Redirect from="/" to="/account" />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;
