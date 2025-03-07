import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
