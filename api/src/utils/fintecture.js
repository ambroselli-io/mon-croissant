const { FintectureClient } = require("fintecture-client");
const { FINTECTURE_APP_ID, FINTECTURE_APP_SECRET, FINTECTURE_API_GATEWAY, FINTECTURE_PRIVATE_KEY } = require("../config");
const { capture } = require("./sentry");

let client = new FintectureClient({
  app_id: process.env.APP_ID,
  app_secret: process.env.APP_SECRET,
  private_key: process.env.APP_PRIV_KEY,
  env: process.env.FINTECTURE_ENV,
});

// // https://docs.fintecture.com/v2/#pis-connect
// const fetch = require("node-fetch");
// const FormData = require("form-data");
// const crypto = require("crypto");

// const { FINTECTURE_APP_ID, FINTECTURE_APP_SECRET, FINTECTURE_API_GATEWAY, FINTECTURE_PRIVATE_KEY } = require("../config");
// const { capture } = require("./sentry");

// class FintectureService {
//   constructor() {
//     this.basic_token = Buffer.from(`${FINTECTURE_APP_ID}:${FINTECTURE_APP_SECRET}`).toString("base64");
//     this.privateAuth = `Basic ${this.basic_token}`;
//     this.config = {
//       app_id: FINTECTURE_APP_ID,
//       app_secret: FINTECTURE_APP_SECRET,
//       private_key: FINTECTURE_PRIVATE_KEY,
//     };
//   }

//   getAccessToken = async () => {
//     const urlSearchParams = new URLSearchParams();
//     urlSearchParams.append("basic_token", this.basic_token);
//     urlSearchParams.append("grant_type", "client_credentials");
//     urlSearchParams.append("app_id", FINTECTURE_APP_ID);
//     urlSearchParams.append("scope", "PIS");

//     const response = await fetch(`${FINTECTURE_API_GATEWAY}/oauth/accesstoken`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/json",
//         Authorization: this.privateAuth,
//       },
//       body: urlSearchParams.toString(),
//     }).then((res) => res.json());
//     /*
//     {
//       access_token: 'my-token',
//       token_type: 'Bearer',
//       expires_in: 3600
//     }
//     */
//     return response;
//   };

//   getConnectUrl = async (access_token) => {
//     const urlSearchParams = new URLSearchParams();
//     urlSearchParams.append("redirect_uri", "http://127.0.0.1:8081");
//     urlSearchParams.append("state", "not-capiche"); // maybe user id ?

//     const body = urlSearchParams.toString();

//     const headers = {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "application/json",
//       Authorization: this.privateAuth,
//       access_token,
//       date: new Date().toUTCString(),
//       digest: hashBase64(body),
//     };

//     headers.signature = createSignatureHeader(headers, this.config, Constants_1.Constants.SIGNEDHEADERPARAMETERLIST);

//     const response = await fetch(`${FINTECTURE_API_GATEWAY}/pis/v2/connect`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/json",
//         Authorization: this.privateAuth,
//         access_token,
//       },
//       body,
//     }).then((res) => res.json());

//     // "x-psu_type": "retail",
//     // "x-country": "FR",
//   };

//   createSignatureHeader(headers, config, signedHeaders) {
//     const signingString = buildSigningString(headers, signedHeaders);
//     const headerString = buildHeaderString(headers, signedHeaders);
//     const signature = signPayload(signingString, config.private_key);
//     return 'keyId="' + config.app_id + '",algorithm="rsa-sha256",headers="' + headerString + '",signature="' + signature + '"';
//   }
// }

// const FintectureAPI = new FintectureService();
// module.exports = FintectureAPI;

// function createSignatureHeader(headers, config, signedHeaders) {
//   const signingString = buildSigningString(headers, signedHeaders);
//   const headerString = buildHeaderString(headers, signedHeaders);

//   const signature = signPayload(signingString, config.private_key);
//   return 'keyId="' + config.app_id + '",algorithm="rsa-sha256",headers="' + headerString + '",signature="' + signature + '"';
// }

// function buildSigningString(headers, signedHeaders) {
//   let signingString = "";

//   signedHeaders.forEach((param) => {
//     if (headers[param]) {
//       const p = param.toLowerCase();
//       signingString = signingString ? signingString + "\n" : signingString;
//       signingString = signingString + p + ": " + headers[param];
//     }
//   });

//   return signingString;
// }

// function buildHeaderString(headers, signedHeaders) {
//   let headerString = "";

//   signedHeaders.forEach((param) => {
//     if (headers[param]) {
//       const p = param.toLowerCase();
//       headerString = headerString ? headerString + " " + p : p;
//     }
//   });

//   return headerString;
// }

// function signPayload(payload, privateKey, algorithm) {
//   if (typeof payload === "object") {
//     payload = JSON.stringify(payload);
//   }

//   if (!algorithm || algorithm === "rsa-sha256") {
//     try {
//       const signature = crypto.createSign("RSA-SHA256");
//       signature.update(payload);
//       signature.end();
//       return signature.sign(privateKey).toString("base64");
//     } catch (error) {
//       throw new Error("error during signature");
//     }
//   }

//   throw new Error("invalid signature algorithm");
// }

// export function hashBase64(plainText) {
//   return crypto.createHash("sha256").update(plainText).digest("base64");
// }
