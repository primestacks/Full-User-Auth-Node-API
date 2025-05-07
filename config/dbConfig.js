const mongoose = require("mongoose");
const DB_URL = process.env.MONGODB_LOCAL_URI;

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(DB_URL);
    console.log(
      `
      Database connected 
      ${connect.connection.host}  
      ${connect.connection.name}
      `
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
