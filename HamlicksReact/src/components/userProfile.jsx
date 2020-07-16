import React from "react";
import Content from "./common/content";
import { getUser } from "../services/userService";
import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";
import "../styles/content.css";

class UserProfile extends Content {
  state = {
    data: {
      email: "",
      name: "",
    },
  };

  //TODO update users to display their favorite ice creams? (An array of flavours that get added when you click the heart)
  //Will need to be added to the backend service as well
  async populateUser() {
    try {
      const userId = this.props.match.params.id;
      const token = await getCurrentUser();
      //Check if the user token isnt admin or the users Id
      if (token._id !== userId && !token.isAdmin)
        return this.props.history.replace("/not-found");
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

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  render() {
    //TODO make this particular section look nice, maybe let people pick their own picture?
    return (
      <div className="back">
        <h1>{this.state.data.name}</h1>
        <p>{this.state.data.email}</p>
        <Link to={`/usersedit/${this.state.data._id}`}>
          <button className="btn btn-primary btn-sm">Edit</button>
        </Link>
      </div>
    );
  }
}

export default UserProfile;
