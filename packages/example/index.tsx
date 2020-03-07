import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";

// import our microfrontends, but don't use them here directly
// this just causes side-effects in the files to run, which will register them
import "./microfrontends/example1";
import "./microfrontends/example2";

import Container from "@microfrontend-react/container";
import Outlet from "@microfrontend-react/outlet";

const App = () => {
  return (
    <div>
      <Container>
        <Outlet registryKey="thing" />
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
