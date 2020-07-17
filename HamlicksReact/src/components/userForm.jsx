import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getUser, saveUser } from "../services/userService";
import auth from "../services/authService";
import "../styles/content.css";

class UserForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
    name: "New User",
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Title"),
    email: Joi.string().email().label("Email"),
    password: Joi.string().min(5),
  };

  async populateUser() {
    try {
      //checking the ID that is passed in via the URL if it is new do not populate fields
      //TODO I re-use this in a few places, maybe consolodate this?
      const userId = this.props.match.params.id;
      const token = await auth.getCurrentUser();
      console.log(token);
      /*TODO this will ensure others cant view other profiles, Needs to be checked on backend as well */
      if (token._id !== userId && !token.isAdmin)
        return this.props.history.replace("/not-found");
      if (userId === "new") {
        return;
      }
      const { data: user } = await getUser(userId);
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  //input the user attained via the URL and set the objects data to the fields in the form
  mapToViewModel(user) {
    this.setState({ name: user.name, favorites: user.favorites });
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: "",
    };
  }

  doSubmit = async () => {
    //take data from the form and use it to save the user (either adding a new or updating existing)
    //TODO Somehow I am ifnoring the isAdmin but if I try to ignore the favorites it will null out the list
    try {
      let user = auth.getCurrentUser();
      delete user.iat;
      user._id = this.state.data._id;
      user.name = this.state.data.name;
      user.email = this.state.data.email;
      user.password = this.state.data.password;
      user.favorites = this.state.favorites;
      console.log(user);
      await saveUser(user);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="back">
        <h1>{this.state.name}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default UserForm;
