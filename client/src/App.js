import logo from "./logo.svg";
import "./App.css";
import Home from "./demo/Home";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import Things from "./demo/Things";
import NoMatch from "./components/NoMatch";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoute";
import User from "./components/User";
// import Available from "./components/Available";
import Available from "./components/AvailableOld";
import AvailableCustom from "./components/AvailableCustom";
import Cities from "./components/Cities";
import FindHome from "./components/FindHome";
import CityCost from "./components/CityCost";

function App() {
  return (
    <>
      <NavBar />
      <FetchUser>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/available" component={Available} />
            <Route exact path="/availableCustom" component={AvailableCustom} />
            <Route exact path="/cities" component={Cities} />
            <Route exact path="/cityCost" component={CityCost} />
            <Route exact path="/findHomes" component={FindHome} />
            <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute exact path="/things" component={Things} />
            <ProtectedRoute exact path="/user" component={User} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </FetchUser>
    </>
  );
}

export default App;
