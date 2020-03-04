import React from 'react';
import Home from './Views/Home/Home';
import Results from './Components/Results/Results';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            exact path='/results'
            render={(props) => <Results {...props}/>}
          />
          <Route exact path="/robots.txt"></Route>
      </Switch>
    </Router>
  );
}

export default App;
