import React, { Component } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { emphasize, withStyles } from "@material-ui/core/styles";
import { Typography, Container, Divider, Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import axios from "axios";
const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300]
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

export class Home extends Component {
  state = {
    header: true,
    List: []
  };
  componentWillMount() {
    axios.get("http://localhost:8090/blogs").then(data => {
      this.setState({ List: data.data.reverse() });
    });
  }
  render() {
    return (
      <Box>
        <br/>
        <br/>
        <br/>
        <Container maxWidth="md">
          {this.state.List.map((item, index) => {            
            if (item.image) {
              var imagediv = (
                <Box>
                  <img src={item.image}></img>
                </Box>
              );
            }else{
              var imagediv=""
            }
            if(item.blog.length>200){
              var blog=item.blog.slice(0,200)+"..."
            }else{
              var blog=item.blog
            }
            return (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/blog/"+item.id}
              >
                <Box className="box">
                  <Box className="detail">
                    <Typography
                      style={{ fontWeight: "900", marginBottom: "10px" }}
                      variant="h6"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="p">{blog}</Typography>
                    <br />
                    <Typography variant="b" className="date">
                      {item.date.slice(0,10)}
                    </Typography>
                  </Box>
                  {imagediv}
                </Box>
                <Divider />
              </Link>
            );
          })}
        </Container>
      </Box>
    );
  }
}

export default Home;
