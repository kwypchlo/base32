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

        <div className="container mx-auto py-4 flex justify-center">
          <div className="w-full min-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-gray-900 font-bold text-xl mb-2">
                Skylink Base32 Encoder
              </h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="input"
                >
                  Source skylink
                </label>
                <div className="flex">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="output"
                >
                  Base32 skylink
                </label>
                <div className="flex">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="output"
                    type="text"
                    readOnly={true}
                    value={base32Skylink}
                  />
                  <button
                    type="button"
                    id="copy-output"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={() => clipboardy.write(base32Skylink)}
                  >
                    copy
                  </button>
                </div>
              </div>
              <div>{errorMessage && <p id="message">{errorMessage}</p>}</div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
