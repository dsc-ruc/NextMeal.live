import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from '../components/Header';
import GoogleMap from '../components/GoogleMap';
import Form from '../components/Form';
import ListView from '../components/ListView';
import './MainPage.css';



export default class MainPage extends Component {

    render() {
        const style={
          marginTop: "90vh",
          position: "relative",
          top: 0,
        }
        return (
          <>
          <div className="main">
            <Router>
              <Header />
              <div className="App">
              </div>

              <Switch>
                <Route path="/about">
                  <div className="page">
                    <About />
                  </div>
                </Route>
                <Route path="/listView">
                  <ListView />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
                
              </Switch>
            </Router>
        </div>
        
        </>
        )
    }
}

function Home() {
  return (
    <GoogleMap />
  )
}
function About() {
  return (
    <Form />
  )
}

function List(){
  return(
    <ListView />
  )
}
