import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTypes } from "../services/typeService";
import { Link } from "react-router-dom";
import { getFlavour, saveFlavour } from "../services/flavourService";

class FlavourForm extends Form {
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
    errors: {},
    name: "New Flavour",
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Title"),
    typeId: Joi.string().required().label("Type"),
    description: Joi.string().label("Description"),
    cost: Joi.number().required().min(0).max(10).label("Cost"),
    licks: Joi.number(),
    picture: Joi.string(),
  };

  async populateTypes() {
    //retrieving all types at the beginning of the components life cycle
    const { data: types } = await getTypes();
    this.setState({ types });
  }

  async populateFlavour() {
    //if a flavour is not found redirect to 404
    try {
      //checking the ID that is passed in via the URL if it is new do not populate fields
      //PROPS can be attained in this way
      const flavourId = this.props.match.params.id;
      if (flavourId === "new") {
        return;
      }
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
    await this.populateTypes();
    await this.populateFlavour();
  }

  //input the flavour attained via the URL and set the objects data to the fields in the form
  mapToViewModel(flavour) {
    this.setState({ name: flavour.name });
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

  doSubmit = async () => {
    //take data from the form and use it to save the flavour (either adding a new or updating existing)
    await saveFlavour(this.state.data);

    this.props.history.push("/flavours");
  };

  render() {
    return (
      <div className="back">
        <h1>{this.state.name}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("typeId", "Type", this.state.types)}
          {this.renderInput("description", "Description")}
          {this.renderInput("cost", "Cost")}
          {this.renderInput("licks", "Licks", "Number")}
          {this.renderInput("picture", "Picture URL")}
          <Link to={"/flavours"}>
            <button className="btn btn-success">Back</button>
          </Link>
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default FlavourForm;
