import mongoose from "mongoose";

// db environment variable is passed in from server.js
const connectDB = (db) => {
  mongoose.set("strictQuery", true);
  mongoose
    // .connect(`mongodb://localhost/${db}`, {
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log(`\nEstablished a connection to the "${db}" database!`)
    )
    .catch((err) => {
      console.error("\nFailed to connect with the database\n", err);
    });
};

export default connectDB;
