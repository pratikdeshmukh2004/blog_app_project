import React, { Component } from "react";
import {
  Card,
  TextField,
  Divider,
  Button,
  CardContent,
  Typography
} from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import alert from "sweetalert";
import {reactLocalStorage} from 'reactjs-localstorage';
export class Signin extends Component {
  state = { redirect: "" };
  onsubmit = event => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    axios
      .post("http://localhost:8090/login", {
        email: email,
        password: password
      })
      .then(data => {
        if (data.data.result === "pass") {
          alert(
            "Invalid Email Password.",
            "Email password is not valid please enter correct email password.",
            "warning"
          );
        } else if (data.data.result) {
          console.log(data.data.token);
          
          reactLocalStorage.set('token',data.data.token)
          alert("Login Successfuly.", "Login successfully enjy..", "success");
          this.setState({ redirect: <Redirect to="/home" /> });
        } else {
          alert(
            "User Not Exists.",
            "This user not exists please create an account...",
            "warning",
            {
              buttons: { ok: "Ok", signup: "Create" }
            }
          ).then(a => {
            if (a === "signup") {
              this.setState({
                redirect: <Redirect to="/register" />
              });
            } else {
              document.getElementById("email").value = "";
              document.getElementById("password").value = "";
            }
          });
        }
      });
  }
  componentDidMount(){
    var token = reactLocalStorage.get("token")
    if (token){
      this.setState({
        redirect:<Redirect to="/home" />
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.redirect}

        <Card className="card">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              Welcome Back
            </Typography>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.onsubmit(e);
              }}
            >
              <TextField
                id="email"
                type="email"
                className="inputs"
                required
                label="Email"
              />
              <br />
              <br />
              <TextField
                type="password"
                id="password"
                className="inputs"
                required
                label="Password"
              />
              <br />
              <br />
              <Button
                type="submit"
                id="button"
                variant="contained"
                color="secondary"
              >
                <DoubleArrowIcon />
                Login
              </Button>
              <Divider />
              <br />
              <br />
              <Link style={{ textDecoration: "none" }} to="/register">
                Create an account...
              </Link><br/><br/>
              <Link style={{ textDecoration: "none" }} to="/home">
                Go to Home...
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Signin;
