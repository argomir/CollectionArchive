import Constants from "expo-constants";

import en from "./locales/en.json";
import es from "./locales/es.json";

type Locale = "en" | "es";

const rawLocale = String(
  Constants.expoConfig?.extra?.appLocale ??
    Constants.manifest?.extra?.appLocale ??
    "en",
)
  .slice(0, 2)
  .toLowerCase();
const locale: Locale = rawLocale === "es" ? "es" : "en";

const messages = { en, es };

export const strings = messages[locale] as typeof en;
