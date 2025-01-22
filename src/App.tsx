import React from "react";

import logo from "./logo.svg";
import "./App.css";

import { useHelloWorldQuery } from "./generated/graphql";

const App = () => {
  const { data, loading } = useHelloWorldQuery();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!loading && data && (
          <div>
            <p>
              <code>{data?.helloWorld}</code>
            </p>
            <p className="App-description">
              If you can see this, the setup with the API was made successfuly.
              Now it's up to you. Good luck ☘️
            </p>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
