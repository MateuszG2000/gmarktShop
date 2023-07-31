const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION!");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const DBstring: string = process.env.DATABASE_STRING ?? "No database string";
const DBpassword: string =
  process.env.DATABASE_PASSWORD ?? "No database password";
const DB = DBstring.replace("<PASSWORD>", DBpassword);

mongoose.connect(DB).then(() => console.log("DB connected!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App started on port: ${port}...`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION!  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
