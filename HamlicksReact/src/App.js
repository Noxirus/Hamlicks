import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import UserProfile from "./components/userProfile";
import Flavours from "./components/flavours";
import Users from "./components/users";
import FlavourDescription from "./components/flavourDescription";
import FlavourForm from "./components/flavourForm";
import Home from "./components/home";
import About from "./components/about";
import UserForm from "./components/userForm";
import NotFound from "./components/common/notFound";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import RegisterForm from "./components/registerForm";
import "./styles/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import "./styles/content.css";
//TODO the import statements are getting a bit messy, maybe a start up component?
//TODO component will be "make your own ice cream"
//TODO Fix the navbar extend button (currently if the window is too small and the collapsed window button shows up clicking it wont work)
//TODO If a user is deleted while logged in may need to check the DB And log them out Somewhere in this app make a consistent check to ensure their account is still in the DB
//TODO add an edit profile form
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
            <ProtectedRoute path="/users/:id" component={UserProfile} />
            <ProtectedRoute
              path="/users"
              render={(props) => <Users {...props} user={user} />}
            />
            <ProtectedRoute path="/usersedit/:id" component={UserForm} />
            <Route path="/about" component={About} />
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
