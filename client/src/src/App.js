
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import navBar from './components/navBar';
import Home from './components/pages/Home'
{/* import router  npm install react-bootstrap bootstrap@4.6.0 */}
function App() {
  return (
    <> 
    <Router>
      <navBar />
        <Switch>
          <Route path ='/' exact component = {Home}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
