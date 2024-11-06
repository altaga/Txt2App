import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";
import { ButtonGroup } from "@mui/material";
import SmartphoneContainer from "./smartphoneContainer.js";
import Loading from "./smartphone.js";
import Building from "./smartphoneCreation.js";
import { toast } from 'react-toastify';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      once: false,
      refresh: Math.random(),
      loading: true, // false
      txt: "",
      response: "",
    };
  }

    async componentDidMount(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
        };
        fetch(`${window.location.href}api`, requestOptions)
            .then(async (res) => {
        if (res.status !== 200) {
          return "Error";
        } else {
          return res.json();
        }
      }).then((result) => {
        this.setState({
          refresh: Math.random(),
          loading: false,
        });
        toast.success("Server started successfully!", {
        position: "top-center"
      });
      })
      .catch((error) => {
        toast.error("Server initialization failed!", {
            position: "top-left"
        });
        this.setState({ refresh: Math.random(), loading: true });
      });
    }

  createApp() {
    this.setState({ loading: true });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    const raw = JSON.stringify({
      prompt: this.state.txt,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${window.location.href}api/ollama/generate`,
      requestOptions
    )
      .then(async (res) => {
        if (res.status !== 200) {
          return "Error";
        } else {
          return res.json();
        }
      })
      .then(async (result) => {
        await fetch(`${window.location.href}render/`)
        this.setState({
          refresh: Math.random(),
          loading: false,
          once: true,
          response: result,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ refresh: Math.random(), loading: false });
      });
  }

  buildApp() {
    this.setState({ loading: true });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    fetch(
       `${window.location.href}api/buildapk`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.result === "ok") {
          this.setState({ loading: false });
          window.open(
              `${window.location.href}api/downloadapk`,
            "_blank"
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => console.error(error));
  }

  render() {
    const width = 380;
    const height = (width * 1858) / 952;
    return (
      <>
        <body style={{ gap: "10px" }}>
          {this.state.stage === 0 && (
            <div
              style={{
                backgroundColor: "#36363b",
                border: "solid 1px #9c27b0",
                width: "50vw",
                height: "50vh",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "40px",
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  textAlign: "justify",
                  textAlignLast: "center",
                  fontSize: "24px",
                }}
              >
                Provide a brief app description, or leave blank. More detail helps the AI tailor the development process to your vision.
              </h3>
              <TextField
                style={{
                  width: "90%",
                  height: "auto",
                  margin: "10px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "solid 1px #9c27b0",
                }}
                id="outlined-multiline-static"
                multiline
                rows={6}
                onChange={(e) => {
                  this.setState({ txt: e.target.value });
                }}
              />
              <ButtonGroup
                variant="contained"
                color="secondary"
                disabled={this.state.loading}
                size="large"
                aria-label="Large button group"
              >
                <Button
                  color="secondary"
                  style={{ fontFamily: "monospace" }}
                  onClick={() => this.createApp()}
                  key="one"
                >
                  Create App
                </Button>
                <Button
                  onClick={() => this.buildApp()}
                  color="secondary"
                  style={{ fontFamily: "monospace" }}
                  key="three"
                >
                  Download App (APK)
                </Button>
                <Button
                  color="secondary"
                  style={{ fontFamily: "monospace" }}
                  onClick={async () => {
                      await fetch(`${window.location.href}render/`)
                      this.setState({ once: true })}
                      }
                  key="four"
                >
                  Show Last App
                </Button>
              </ButtonGroup>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#27272a",	
            }}
          >
            {this.state.loading || !this.state.once ? (
              <SmartphoneContainer
                width={width}
                component={!this.state.loading ? <Loading /> : <Building />}
              />
            ) : (
              <iframe
                key={this.state.refresh}
                style={{
                  border: "none",
                }}
                width={`${width}px`}
                height={`${height}px`}
                src={`${window.location.href}render/?width=${width}px`}
              />
            )}
          </div>
        </body>
      </>
    );
  }
}
