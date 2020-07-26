import React from "react";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import Home from "./containers/Home";

function App() {
  return (
    <Provider store={Store()}>
      <BrowserRouter>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </HashRouter>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
