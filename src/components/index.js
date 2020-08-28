import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import store from "../redux/configureStore";

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Index;
