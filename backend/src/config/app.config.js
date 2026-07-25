require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    appName: process.env.APP_NAME || "FlavorForge Backend",
    appVersion: process.env.APP_VERSION || "1.0.0"
};