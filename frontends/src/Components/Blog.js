import React, { Component } from "react";
import Head from "./../Components/Header";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Typography, Container, Avatar } from "@material-ui/core";

export class Blog extends Component {
  state = { redirect: "", Blogdata: [], user: {} };
  componentWillMount() {
    let value = this.props.match.params.id;
    Axios.get("http://localhost:8090/blogs/" + value).then(data => {
      if (data.data.result) {
        Axios.post("http://localhost:8090/getuser", {
          userid: data.data.data[0].user_id
        }).then(user => {
          if (user.data.result) {
            this.setState({
              Blogdata: data.data.data[0],
              user: user.data.user[0]
            });
          } else {
            this.setState({ redirect: <Redirect to="/home" /> });
          }
        });
      } else {
        this.setState({ redirect: <Redirect to="/home" /> });
      }
    });
  }

  render() {
    console.log(this.state);
    var icon = "";
    var date= "";
    var image = "";
    if (this.state.user.name) {
      icon = this.state.user.name.slice(0, 1);
      date = this.state.Blogdata.date.slice(0, 10);
    }
    if (this.state.Blogdata.image){
      image=<img class="blog_image" src={this.state.Blogdata.image} />
    }
    return (
      <div>
        {this.state.redirect}
        <Head />
        <Container maxWidth="md">
          <div style={{ marginTop: "80px" }}>
            <Typography
              style={{ fontWeight: "100", marginBottom: "10px" }}
              variant="h4"
            >
              {this.state.Blogdata.title}
            </Typography>
            <br />
            <div style={{ display: "flex" }}>
              <Avatar>{icon}</Avatar>
              <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                <b>{this.state.user.name}</b>
                <p style={{marginTop:"0px"}}>{date}</p>
              </div>
            </div>
          <p style={{fontSize:"24px"}}>{this.state.Blogdata.blog}</p>
          {image}
          </div>
        </Container>
      </div>
    );
  }
}

export default Blog;
