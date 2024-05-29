// src/controllers/health.controller.js

exports.healthCheckSync = () => ('OK');

exports.healthCheckAsync = () => {
  return Promise.resolve('OK');
};
