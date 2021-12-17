/*
 * @Descripttion:
 * @version:
 * @Author: dal
 * @Date: 2021-12-17 14:48:35
 * @LastEditors: dal
 * @LastEditTime: 2021-12-17 15:51:53
 */
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");

class Weather {
  constructor(ENV) {
    this.ENV = ENV;
  }
  async get() {
    return new Promise((resolve, reject) => {
      request(this.ENV.weather_Url, (err, res, body) => {
        if (!err && res.statusCode == 200) {
          //输出网页内容
          let $ = cheerio.load(body);
          let update_time = $(".banner-city-date").text().replace(/\s/g, "");
          let city = $(".banner-city-change")
            .find("a")
            .find("span")
            .text()
            .replace(/\s/g, "");
          let content = $(".banner-whether-list")
            .find("a")
            .find("span")
            .text()
            .replace(/\s/g, "");
          let msg = `Hi~现在是时间${moment()
            .locale("zh-cn")
            .format(
              "YYYY-MM-DD HH:mm:ss"
            )}\n今日${city}的天气：${content}\n ${update_time} `;
          console.log(msg);
          resolve(msg);
        } else {
          reject("failed to crawl the website!");
        }
      });
    });
  }
}
module.exports = Weather;
