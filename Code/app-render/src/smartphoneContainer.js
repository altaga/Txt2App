import React, { Component } from "react";
import Smartphone from "./smartphone.js";

export default class SmartphoneContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const width = urlParams.get("width");
    return (
      <div
        style={{
          position: "relative",
          width: `${width}`,
          height: "auto",
          aspectRatio: 952 / 1858,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          backgroundColor: "#27272a",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "82%",
            height: "auto",
            zIndex: 1,
            aspectRatio: 820 / 1890,
            backgroundColor: "white",
          }}
        >
          <Smartphone/>
        </div>
        <img
          style={{
            position: "absolute",
            overlay: "auto",
            zIndex: 1,
            width: "94%",
            height: "auto",
            aspectRatio: 820 / 1748,
            pointerEvents: "none",
          }}
          src="./assets/smartphoneG.png"
        />
      </div>
    );
  }
}
