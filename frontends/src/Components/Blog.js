import React, { Component } from "react";
import Head from './../Components/Header'
export class Blog extends Component {
  componentDidMount() {
    // const value=queryString.parse(this.props.location.search)
    // console.log(query)
    let value = this.props.match.params.id;
    console.log(value)
    
  }
  
  render() {
    return (
      <div>
        <Head/>
      </div>
    )
  }
}

export default Blog;
