import React, { Component } from "react";

class Content extends Component {
  state = { data: {}, errors: {} };
  renderText(name, label, type = "text") {
    const { data } = this.state;
    return <p>{data[name]}</p>;
  }
  /*TODO add a nice background to the content window */
  renderImage(name, label, type = "image") {
    const { data } = this.state;
    return <img src={data.picture} alt={name} height="500" width="320" />;
  }
}

export default Content;
