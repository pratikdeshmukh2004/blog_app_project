import React, { Component } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Divider,
  formatMs,
  Button
} from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";

export class Myblog extends Component {
  state = { redirect: "", List: [] };
  componentWillMount() {
    var token = reactLocalStorage.get("token");
    console.log("Hello");

    if (token) {
      Axios.post("http://localhost:8090/verify", { token: token }).then(id => {
        Axios.get("http://localhost:8090/getblog/" + id.data.id).then(data => {
          this.setState({
            List: data.data
          });
        });
      });
    } else {
      this.setState({
        redirect: <Redirect to="/login" />
      });
    }
  }
  onDelete=(id)=>{
    Axios.delete("http://localhost:8090/delete/"+id)
    .then(()=>{
        var newlist=[];
        for (var i of this.state.List){
            if (i.id!==id){
                newlist.push(i)
            }
        }
        this.setState({
            List:newlist
        })
    })
  }
  render() {
    console.log(this.state);
    return (
      <Box>
        <br />
        <br />
        <br />
        {this.state.redirect}
        <Container maxWidth="md">
          {this.state.List.map((item, index) => {              
            if (item.image) {
              var imagediv = (
                <Box>
                  <img src={item.image}></img>
                </Box>
              );
            } else {
              var imagediv = "";
            }
            if (item.blog.length > 200) {
              var blog = item.blog.slice(0, 200) + "...";
            } else {
              var blog = item.blog;
            }
            return (
              <div>
                <Box className="box">
                  <Box className="detail">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={"/blog/" + item.id}
                    >
                      <Typography
                        style={{ fontWeight: "900", marginBottom: "10px" }}
                        variant="h6"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="p">{blog}</Typography>
                      <br />
                      <Typography variant="b" className="date">
                        {item.date.slice(0, 10)}
                      </Typography>
                      <br />
                    </Link>
                    <Button
                      
                      onClick={()=>{this.onDelete(item.id)}}
                      color="primary"
                      style={{ width: "50px" }}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </Box>
                  {imagediv}
                </Box>
                <Divider />
              </div>
            );
          })}
        </Container>
      </Box>
    );
  }
}

export default Myblog;
