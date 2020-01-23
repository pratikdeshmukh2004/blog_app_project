import React, { Component } from "react";
import {
  Card,
  TextField,
  Divider,
  Button,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import axios from "axios";
import alert from "sweetalert";
export class Signup extends Component {
  state = { redirect: "" };
  onsubmit = event => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    axios
      .post("http://localhost:8090/register", {
        name: name,
        email: email,
        password: password
      })
      .then(data => {
        if (data.data.result) {
          alert("Account Created.", "account created successful.", "success", {
            buttons: { ok: "Ok", login: "Login" }
          }).then(a => {
            if (a === "login") {
              this.setState({
                redirect: <Redirect to="/login" />
              });
            } else {
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("password").value = "";
            }
          });
        } else {
          alert(
            "User Exists.",
            "This user already exists please login...",
            "warning",
            {
              buttons: { ok: "Ok", login: "Login" }
            }
          ).then(a => {
            if (a === "login") {
              this.setState({
                redirect: <Redirect to="/login" />
              });
            } else {
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("password").value = "";
            }
          });
        }
      });
  };
  render() {
    return (
      <div>
        <Card className="card">
          {this.state.redirect}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              Create an account
            </Typography>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.onsubmit(e);
              }}
            >
              <TextField
                type="name"
                name="name"
                id="name"
                className="inputs"
                required
                label="Your Name"
              />
              <br />
              <br />
              <TextField
                type="email"
                name="email"
                id="email"
                className="inputs"
                required
                label="Email"
              />
              <br />
              <br />
              <TextField
                type="password"
                name="password"
                id="password"
                className="inputs"
                required
                label="Password"
              />
              <br />
              <br />
              <Button
                id="button"
                type="submit"
                variant="contained"
                color="secondary"
              >
                <DoubleArrowIcon />
                Signup
              </Button>
              <Divider />
              <br />
              <br />
              <Link style={{ textDecoration: "none" }} to="/login">
                already have an account...
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Signup;
