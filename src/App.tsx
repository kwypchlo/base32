import React, { useCallback, useState } from "react";
import * as clipboardy from "clipboardy";
import { SkynetClient } from "skynet-js";
import logo from "./logo.svg";
import "./App.css";
import "fontsource-metropolis/all.css";

const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;

const client = new SkynetClient(portal);

function App() {
  const [base64Skylink, setBase64Skylink] = useState("");
  const [base32Skylink, setBase32Skylink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBase64SkylinkChange = useCallback(
    (event) => {
      setBase64Skylink(event.target.value);
      setErrorMessage("");

      if (!event.target.value) return;

      try {
        client
          .getSkylinkUrl(event.target.value, { subdomain: true })
          .then((base32Url) => setBase32Skylink(base32Url))
          .catch((error) => {
            setBase32Skylink("");
            setErrorMessage(error.message);
          });
      } catch (error) {
        setBase32Skylink("");
        setErrorMessage(error.message);
      }
    },
    [setBase64Skylink, setBase32Skylink, setErrorMessage]
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          <h1>Skylink Base32 Encoder</h1>
          <div className="mb-4">
            <label htmlFor="input">Source skylink</label>
            <div className="flex">
              <input
                id="input"
                type="text"
                placeholder="ie. XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg"
                autoFocus={true}
                value={base64Skylink}
                onChange={handleBase64SkylinkChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="output">Base32 skylink</label>
            <div className="flex">
              <input
                id="output"
                type="text"
                readOnly={true}
                value={base32Skylink}
              />
              <div
                className="button"
                style={
                  base32Skylink ? {} : { pointerEvents: "none", opacity: "0.4" }
                }
              >
                <a onClick={() => clipboardy.write(base32Skylink)} href="#">
                  copy
                </a>
              </div>
              <div
                className="button"
                style={
                  base32Skylink ? {} : { pointerEvents: "none", opacity: "0.4" }
                }
              >
                <a
                  href={base32Skylink}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  view
                </a>
              </div>
            </div>
            <div>{errorMessage && <p className="error">{errorMessage}</p>}</div>
          </div>
          <footer>
            Read more on{" "}
            <a
              href="https://github.com/kwypchlo/base32"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </footer>
        </div>
      </header>
    </div>
  );
}

export default App;
