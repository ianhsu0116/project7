import React from "react";
import { Switch, Route } from "react-router-dom";
import NavComponent from "./components/nav-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";

const App = () => {
  return (
    <div>
      <NavComponent />
      <Switch>
        <Route path="/" exact>
          <HomeComponent />
        </Route>
        <Route path="/register" exact>
          <RegisterComponent />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
