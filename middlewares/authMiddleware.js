const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const findUser = await User.findOne(req.session.userId);
    if (!findUser) {
      console.log("Error :User not found ! ! !");
      return res.redirect("/");
    }
    next();
  } catch (err) {
    console.log("Error :User not found ! ! !");
    return res.redirect("/");
  }
};
