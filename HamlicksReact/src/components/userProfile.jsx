import React from "react";
import Content from "./common/content";
import { getUser } from "../services/userService";
import { getCurrentUser } from "../services/authService";

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
      /*TODO this will ensure others cant view other profiles, Needs to be checked on backend as well */
      //TODO add admin access so that if the person is admin they can view other profiles
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
      <React.Fragment>
        <h1>{this.state.data.name}</h1>
        <h1>{this.state.data.email}</h1>
      </React.Fragment>
    );
  }
}

export default UserProfile;
