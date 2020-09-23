# Skylink Base32 Encoder

This is a simple webapp that encodes standard Base64 skylink into its Base32 representation. It is useful if you want to access your skylink using a subdomain like this [https://bg06v2tidkir84hg0s1s4t97jaeoaa1jse1svrad657u070c9calq4g.siasky.net](https://bg06v2tidkir84hg0s1s4t97jaeoaa1jse1svrad657u070c9calq4g.siasky.net).

The application encode the skylink in 2 steps:

1. first it decodes the skylink into `Uint8Array` using [base64-js](https://github.com/beatgammit/base64-js)
2. then it encodes the resulting `Uint8Array` using [base32-encode](https://github.com/LinusU/base32-encode) RFC4648-HEX implementation (without padding)

Actual functions that do all the work can be found [here](https://github.com/kwypchlo/base32/blob/master/src/crypto.ts).

## Available Scripts

_Install dependencies with `yarn` before trying to execute any of the commands._

In the project directory, you can run:

- `yarn start`: start the project in development mode (open [http://localhost:3000](http://localhost:3000) to view it in the browser)
- `yarn test`: launch test runner in the interactive watch mode
- `yarn build`: build the app for production to the `build` folder

## Deploying to Skynet

1. run `yarn build` to build the app for production
2. visit [siasky.net](https://siasky.net) and click on "Do you want to upload entire directory?" to switch to directory upload mode
3. drag the `build` folder over the upload area (or click "Browse" and select the directory from the file browser window)

To learn more about Skynet, visit [siasky.net](https://siasky.net) official webpage.
