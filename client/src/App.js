
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import navBar from './components/navBar';
import Home from './components/pages/Home'
import Services from './components/pages/Services'
import About from './components/pages/About'
import SignedUp from './components/pages/SignedUp'
{/* import router  npm install react-bootstrap bootstrap@4.6.0 */}
function App() {
  return (
    <> 
    <Router>
      <navBar />
        <Switch>
          <Route path ='/' exact component = {Home}/>
          <Route path ='/services' exact component = {Services}/>
          <Route path ='/about' exact component = {About}/>
          <Route path ='/sign-up' exact component = {SignedUp}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
