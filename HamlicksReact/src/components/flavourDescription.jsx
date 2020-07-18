import React from "react";
import { getFlavour } from "../services/flavourService";
import Content from "./common/content";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import "../styles/content.css";

class FlavourDescription extends Content {
  state = {
    data: {
      name: "",
      typeId: "",
      description: "",
      cost: "",
      licks: "",
      picture: "",
    },
    types: [],
  };

  async populateFlavour() {
    //if a flavour is not found redirect to 404
    try {
      //PROPS can be attained in this way
      const flavourId = this.props.match.params.id;
      const { data: flavour } = await getFlavour(flavourId);
      //map the fields to the correct data types based on the flavour type found in the URL
      this.setState({ data: this.mapToViewModel(flavour) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateFlavour();
  }

  //input the flavour attained via the URL and set the objects data to the fields in the form
  mapToViewModel(flavour) {
    this.setState({
      name: flavour.name,
      cost: flavour.cost,
      licks: flavour.licks,
    });
    return {
      _id: flavour._id,
      name: flavour.name,
      typeId: flavour.type._id,
      description: flavour.description,
      cost: flavour.cost,
      licks: flavour.licks,
      picture: flavour.picture,
    };
  }
  /* TODO design a nice layout for the ice cream descriptions here */
  render() {
    const user = auth.getCurrentUser();
    return (
      <div className="container back">
        <div className="row">
          <div className="col-sm">
            <h1>{this.state.name}</h1>
            {this.renderText("description", "Description")}
            <br />
            <p>Cost: ${this.state.cost}</p>
            <p>Licks: {this.state.licks}/5</p>
          </div>
          <div className="col-sm">{this.renderImage("image", "Image")}</div>
        </div>

        {user && user.isAdmin && (
          <Link to={`/flavoursedit/${this.state.data._id}`}>
            <button className="btn btn-primary btn-sm">Edit</button>
          </Link>
        )}
      </div>
    );
  }
}

export default FlavourDescription;
