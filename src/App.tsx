import React, { useCallback, useState } from "react";
import * as clipboardy from "clipboardy";
import { decodeBase64, encodeBase32 } from "./crypto";
import logo from "./logo.svg";
import "./App.css";
import "typeface-metropolis";

function App() {
  const [base64Skylink, setBase64Skylink] = useState("");
  const [base32Skylink, setBase32Skylink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBase64SkylinkChange = useCallback(
    (event) => {
      setErrorMessage("");
      setBase64Skylink(event.target.value);

      if (!event.target.value) {
        setBase32Skylink("");
        return;
      }

      try {
        const decoded = decodeBase64(event.target.value);
        const encoded = encodeBase32(decoded);

        setBase32Skylink(encoded);
      } catch (error) {
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
              <button
                type="button"
                onClick={() => clipboardy.write(base32Skylink)}
              >
                copy
              </button>
            </div>
          </div>
          <div>{errorMessage && <p className="error">{errorMessage}</p>}</div>
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
