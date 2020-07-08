import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import Navigation from './components/Navigation';
import StockChartsList from './components/StockChartsList/StockChartsList';
import StockChart from './components/StockChart/StockChart';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';


toast.configure();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={StockChartsList}/>
          <Route path="/subscribed" component={StockChart} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
