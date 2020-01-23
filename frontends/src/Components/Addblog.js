import React, { Component } from "react";
import { TextField, Container, Button, Select } from "@material-ui/core";
import {reactLocalStorage} from 'reactjs-localstorage';
import {Redirect} from 'react-router-dom';
import Axios from "axios";
export class Addblog extends Component {
  state={redirect:"",userid:1}
  componentDidMount(){
    var token = reactLocalStorage.get("token");
    if (token===undefined){
      this.setState({
        redirect:<Redirect to="/login"/>
      })
    }else{
      Axios.post("http://localhost:8090/verify",{token})
      .then((data)=>{
        this.setState({
          userid:data.data.id
        })
      })
      .catch(()=>{
        localStorage.clear("token")
        this.setState({
          redirect:<Redirect to="/home"/>
        })
      })
    }
  }
  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        {this.state.redirect}
        <Container maxWidth="md">
          <form
        action="http://localhost:8090/new"
        method="POST"
        encType="multipart/form-data"
          >
            <h2 style={{ textAlign: "center" }}>Add New Blog</h2>
            <input name="user" style={{display:"none"}} value={this.state.userid}/>
            <TextField
              required
              name="title"
              placeholder="Add Title Here..."
              fullWidth
            />
            <br />
            <br/>
            <TextField
              required
              name="des"
              placeholder="Add Small description here..."
              fullWidth
            />
            <br />
            <br/>
            <TextField
              required
              title=""
              name="blog"
              placeholder="Add your blog here..."
              fullWidth
              multiline={true}
              rowsMax={10}
              variant="outlined"
              rows={4}
            />
            <br />
            <br />
            <TextField
              required
              name="tag"
              placeholder="tag something here..."
              fullWidth
            />
            <br/>
            <br/>
            <div class="form-group files color">
                <label>Upload Your File </label>
                <input name="image" type="file" class="form-control"/>
            </div>
            <br />
            <Button type="submit" variant="contained" color="secondary">
              Publish
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default Addblog;
