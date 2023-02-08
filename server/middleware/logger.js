import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const __dirname = path.resolve();

  try {
    if (!fs.existsSync(path.join(__dirname, ".", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, ".", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, ".", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log("\nERROR:", err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`\nLOGGER: ${req.method} ${req.path}`);
  next();
};
