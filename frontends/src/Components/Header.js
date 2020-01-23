import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
export class Header extends Component {
  state = {
    header: false,
    redirect: ""
  };
  componentDidMount() {
    var token = reactLocalStorage.get("token");
    if (token !== undefined) {
      this.setState({
        header: true
      });
    }
  }
  logout = () => {
    reactLocalStorage.clear("token");
    this.setState({
      redirect: <Redirect to="/login" />
    });
  };
  render() {
    if (!this.state.header) {
      var appbar;
      appbar = (
        <AppBar color="secondary" position="fixed">
          <Toolbar>
            <Typography style={{ flexGrow: 1, fontWeight: "900" }} variant="h6">
              <Link style={{ textDecoration: "none",color:"white" }} to="/home">
                Blogs
              </Link>
            </Typography>
            <Box>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/login"
              >
                <Button color="inherit">Login</Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      );
    } else {
      appbar = (
        <AppBar color="secondary" position="fixed">
          <Toolbar>
            <Typography style={{ flexGrow: 1, fontWeight: "900" }} variant="h6">
              <Link style={{ textDecoration: "none",color:"white" }} to="/home">
                Blogs
              </Link>
            </Typography>
            <div className="dropdown" style={{ float: "right" }}>
              <Avatar className="dropbtn"></Avatar>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/blogs">My blogs</Link>
                <Link to="/new">Add new blog</Link>
                <Link
                  onClick={this.logout}
                  style={{ backgroundColor: "red" }}
                  to="#"
                >
                  Logout
                </Link>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      );
    }
    return (
      <div>
        {appbar}
        {this.state.redirect}
      </div>
    );
  }
}

export default Header;
