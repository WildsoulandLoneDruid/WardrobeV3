
import './app.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/home.js'
import Services from './components/pages/services.js'
import About from './components/pages/about.js'
import Signed_Up from './components/pages/sign_up.js'
import Login from './components/pages/login.js'
import UserPage from './components/pages/userPage.js'


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
