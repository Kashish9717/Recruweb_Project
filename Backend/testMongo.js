// testMongo.js
import mongoose from "mongoose";

const uri =
  "mongodb+srv://Recruweb_developer:recruweb_12@recruweb.mxhpcwq.mongodb.net/recruweb?retryWrites=true&w=majority&appName=Recruweb";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });