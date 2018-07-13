import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import AddCollection from '../../Components/Collection/AddCollection';
import ViewCollections from '../../components/Collection/ViewCollections';
import AddEmployee from '../../components/Employee/AddEmployee'
import ViewEmployees from '../../components/Employee/ViewEmployees'
import AddExpenditureCollection from '../../components/Collection/AddExpenditureCollection'
import ViewExpenditureCollections from '../../components/Collection/ViewExpenditureCollections'
import Login from '../../views/Login/Login'
import firebase from 'firebase';
class Full extends Component {

  constructor(props) {
    super(props)


    const isLogin = localStorage.getItem("isLogin");
    console.log("full.js login " + localStorage.getItem('isLogin'));
    if (isLogin === 'true') {
      console.log("if");
    } else {
      console.log("else");
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                {/* <Route path="/dashboard" name="Dashboard" component={Dashboard} /> */}

                <Route path ="/dashboard" name="Dashboard" render={(props)=> <Dashboard {...props} db={firebase}/>}/>
                <Route path="/collection" name="Collection"
                  render={(props) => <AddCollection {...props} db={firebase} />}
                />
                <Route path="/viewcollections" name="View Collections"
                  render={(props) => <ViewCollections {...props} db={firebase} />} />
                <Route path="/employee" name="Add Employee"
                  render={(props) => <AddEmployee {...props} db={firebase} />} />

                <Route path="/viewemployees" name="View Employee"
                  render={(props) => <ViewEmployees {...props} db={firebase} />} />
                <Route path="/addexpenditurecollection" name="Expenditure"
                  render={(props) => <AddExpenditureCollection {...props} db={firebase} />} />
                <Route path="/viewexpenditurecollection" name="View Expenditure"
                  render={(props) => <ViewExpenditureCollections {...props} db={firebase} />} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
