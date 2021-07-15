
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import navBar from './components/navBar';
import Home from './components/pages/Home'
import Services from './components/pages/Services'
import About from './components/pages/About'
import Signed_Up from './components/pages/Sign_up'
{/* import router  npm install react-bootstrap bootstrap@4.6.0
  npm install node-sass --save-dev
  stylized-componetns
*/}
function App() {
  return (
    <> 
    <Router>
      <navBar />
        <Switch>
          <Route path ='/' exact component = {Home}/>
          <Route path ='/services' exact component = {Services}/>
          <Route path ='/about' exact component = {About}/>
          <Route path ='/sign-up' exact component = {Signed_Up}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
