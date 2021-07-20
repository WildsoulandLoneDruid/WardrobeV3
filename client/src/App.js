
import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home.js'
import Services from './components/pages/Services.js'
import About from './components/pages/About.js'
import Signed_Up from './components/pages/Sign_up.js'
import Login from './components/pages/Login.js'
import UserPage from './components/pages/UserPage.js'


/* import router  npm install react-bootstrap bootstrap@4.6.0
  npm install node-sass --save-dev
  stylized-componetns
*/
function App() {
  return (
    <> 
    <Router>
        <Switch>
          <Route path ='/' exact component={Home}/>
          <Route path ='/services' exact component={Services}/>
          <Route path ='/about' exact component={About}/>
          <Route path ='/sign-up' exact component={Signed_Up}/>
          <Route path ='/login' exact component={Login}/>
          <Route path ='/userpage' exact component={UserPage}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
