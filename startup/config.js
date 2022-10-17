const config = require("config");
module.exports = function () {
  // make sure environment variable is set by export jwtPrivateKey = key_name
  if (!config.get("jwtPrivateKey")) {
    throw new Error("Fatal error: jwtPrivateKey is not defined");
  }
  console.log(`private key is ${config.get("jwtPrivateKey")}`);
};
