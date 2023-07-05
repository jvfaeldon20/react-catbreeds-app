import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CatsPage from './components/CatsPage';
import CatItemPage from './components/CatItemPage';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Router>
        <Switch>
          <Route 
            exact 
            path="/" 
            component={CatsPage} 
          />
          <Route 
            path="/cats/:catId" 
            component={CatItemPage} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
