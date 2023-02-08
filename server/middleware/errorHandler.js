import { logEvents } from "./logger.js";

export const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log("\nERROR STACK:", err.stack);

  const status = res.statusCode ? res.statusCode : 500; // 500 = Internal Server Error
  res.status(status).json({ message: err.message });
};
