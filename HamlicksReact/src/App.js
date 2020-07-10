import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Flavours from "./components/flavours";
import FlavourDescription from "./components/flavourDescription";
import FlavourForm from "./components/flavourForm";
import Home from "./components/home";
import NotFound from "./components/common/notFound";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
//TODO main page will have a slideshow of ice cream and information
//TODO component will be "make your own ice cream"
//TODO Will need to go back over adding backend services on the Mosh tutorial when I have lined up the hamlicks backend with the react project
class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/flavoursedit/:id" component={FlavourForm} />
            <Route path="/flavours/:id" component={FlavourDescription} />
            <Route
              path="/flavours"
              render={(props) => <Flavours {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
