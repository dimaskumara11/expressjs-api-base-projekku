var express = require('express');
var logger = require('morgan');

var indexRouter = require('./route');
var companyRouter = require('./route/company.route');
var mediaRouter = require('./route/media.route');

var app = express();

const db = require("./model");
const { responseErrorCode } = require('./helper/response.helper');
const version = "v1"
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (!req.headers['private-token']){
    if(req.headers['private-token'] != "token dimas kumara"){
      const result = responseErrorCode("PRIVATE TOKEN INVALID")
      return res.status(result.status).json(result.res_body)
    }
  }
  next()
})
app.use(`/${version}`, indexRouter);
app.use(`/${version}/company`, companyRouter);
app.use(`/${version}/media`, mediaRouter);

module.exports = app;
