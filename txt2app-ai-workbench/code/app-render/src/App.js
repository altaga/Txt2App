import React, { Component } from "react";
import "./App.css";
import SmartphoneContainer from "./smartphoneContainer.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  render() {
    return (
      <>
        <body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#27272a",
            }}
          >
            <SmartphoneContainer />
          </div>
        </body>
      </>
    );
  }
}
