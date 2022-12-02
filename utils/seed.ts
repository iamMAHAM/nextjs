import User from "../models/user.model";
import data from "./data";

const cleaner = async function () {
  await User.deleteMany();
  await User.insertMany(data.users);
};

export default cleaner;
