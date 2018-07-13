import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

// Containers
import Full from './containers/Full/';
import Login from './views/Login/Login';
import firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);
        var config = {
            apiKey: "AIzaSyDPE5V3sCaTs5I8u84esN9fMLuRni5K2i4",
            authDomain: "helpinghandmangment.firebaseapp.com",
            databaseURL: "https://helpinghandmangment.firebaseio.com",
            projectId: "helpinghandmangment",
            storageBucket: "helpinghandmangment.appspot.com",
            messagingSenderId: "261580186704"
          };
          firebase.initializeApp(config);
    }

    render() {
      return (
        <HashRouter>
            <Switch>
            <Route path = "/dashboard" name = "Dashboard" component={Full}/>
      <Route path="/login" name="Login" component={Login}/>
      <Route path="/" name="Dashboard" component={Full}/>
            </Switch>
        </HashRouter>
      );
    }
  }
  
export default App;