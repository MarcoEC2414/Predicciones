require('reflect-metadata');

let expressApp;

module.exports = async (req, res) => {
  if (!expressApp) {
    const { getExpressApp } = require('./nest-dist/serverless');
    expressApp = await getExpressApp();
  }
  return expressApp(req, res);
};
