import User from "../models/user.model";
import data from "./data";

const cleaner = async function () {
  await User.deleteMany();
  data.users.map(async u => await User.create(u))
};

export default cleaner;
