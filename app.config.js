require("dotenv").config();

import appJson, { expo as _expo } from "./app.json";
const appLocale = process.env.APP_LOCALE || "en";

export default {
  ...appJson,
  expo: {
    ..._expo,
    extra: {
      ..._expo.extra,
      appLocale,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
  },
};
