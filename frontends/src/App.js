import React, { Component } from "react";
import "./App.css";
import Signup from "./Components/Signup";
import Signin from './Components/Signin'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Addblog from "./Components/Addblog";
import Blog from "./Components/Blog";
export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Signin} />
          <Route path="/home" component={()=>(<div><Header/><Home/></div>)}/>
          <Route path="/new" component={()=>(<div><Header/><Addblog/></div>)} />
          <Route path="/blog/:id" component={Blog} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    );
  }
}

export default App;
