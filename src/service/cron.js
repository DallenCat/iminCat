/*
 * @Descripttion:
 * @version:
 * @Author: dal
 * @Date: 2021-12-17 13:16:27
 * @LastEditors: dal
 * @LastEditTime: 2021-12-17 17:20:14
 */
const schedule = require("node-schedule");
const moment = require("moment");
const Weather = require("./weather");

class Job {
  constructor(ENV) {
    this.ENV = ENV;
  }
  log(message, type) {
    type = type || "info";
    message =
      typeof message == "object" ? JSON.stringify(message, null, 4) : message;
    let msg = `[${moment()
      .locale("zh-cn")
      .format("YYYY-MM-DD HH:mm:ss")}][${type
      .toUpperCase()
      .padStart(7)}]${message}`;
    if (type == "verbose") {
      msg = msg.gray;
    }
    if (type == "info") {
      msg = msg.white;
    }
    if (type == "success") {
      msg = msg.green;
    }
    if (type == "warn") {
      msg = msg.yellow;
    }
    if (type == "error") {
      msg = msg.red;
    }
    console.log(msg);
  }
  async start() {
    let time = this.ENV.time;
    schedule.scheduleJob(time, async () => {
      console.log("scheduleCronStyle:" + new Date());
      const weather = new Weather(this.ENV);
      await weather.get();
    });

    this.log(`定时任务开启，${time}会自动执行`, "success");
  }
}
module.exports = Job;
