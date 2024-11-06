import React, { Component } from "react";
import Smartphone from "./smartphone.js";

export default class SmartphoneContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: "relative",
          width: `${this.props.width}px`,
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
          }}
        >
          {this.props.component}
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
          src="./assets/smartphone.png"
        />
      </div>
    );
  }
}
