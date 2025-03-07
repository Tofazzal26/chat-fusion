import mongoose from "mongoose";

const ConnectMongoose = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rgxjhma.mongodb.net/chatFusion?retryWrites=true&w=majority&appName=Cluster0`;
    const resp = await mongoose?.connect(uri);
    console.log("Mongoose Connected Successful");
  } catch (error) {
    console.log(error, "Mongoose Connect Failed");
  }
};

export default ConnectMongoose;
