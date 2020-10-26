import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.scss";
import { Authentication } from "./Pages/Authentication";
import { RootStore } from "./store/RootStore";
import { Provider } from "mobx-react";
import { auth } from "./firebase";
import { Home } from "./Pages/Home";
import { SingleMoviePage } from "./Pages/SingleMoviePage";
import { NavBar } from "./components/NavBar";

const rootStore = RootStore.create();
window.STATE = rootStore;

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
  }, []);

  return (
    <Provider rootStore={rootStore}>
      {user ? (
        <BrowserRouter>
          <NavBar />
          <Route
            render={({ location }) => (
              <AnimatePresence initial={true} exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route exact path="/" component={withRouter(Home)} />
                  <Route
                    exact
                    path="/:serieId"
                    component={withRouter(SingleMoviePage)}
                  />
                </Switch>
              </AnimatePresence>
            )}
          />
        </BrowserRouter>
      ) : (
        <Switch>
          <Route exact path="/" component={Authentication} />
        </Switch>
      )}
    </Provider>
  );
}

export default App;
