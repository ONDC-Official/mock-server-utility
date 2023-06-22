const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;
const config = require("./config");

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
const log=config.getLog();
const logger = createLogger({
    level: log,
    format: combine(
        timestamp(),
        myFormat
      ),
    transports: [
      new transports.DailyRotateFile({
         filename: 'log_report',
         datePattern: 'YYYY-MM-DD',
         zippedArchive: true,
         level: 'info'
      }),
      new transports.Console
    ]
});

module.exports=logger;