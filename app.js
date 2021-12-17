/*
 * @Descripttion:
 * @version:
 * @Author: dal
 * @Date: 2021-12-17 11:30:38
 * @LastEditors: dal
 * @LastEditTime: 2021-12-17 15:59:31
 */
require("colors");

const express = require("express");
const ENV = require("./env.json");
const Job = require("./src/service/cron");
const app = express();

app.get("/", function (req, res) {
  const job = new Job(ENV);
  job.start();
});
app.listen(3000, function () {
  console.log("Hello World is listening at port 3000");
});
