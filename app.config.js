const appJson = require('./app.json');
const appLocale = process.env.APP_LOCALE || 'en';

module.exports = {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      appLocale,
    },
  },
};
