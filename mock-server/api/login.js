// @ts-check
const users = require("../data/users.json");

/**
 *
 * @param {import('express').Request} rep
 * @param {import('express').Response} res
 * @returns
 */
module.exports = (rep, res) => {
  const { userName, passWord } = rep.body;

  const user = users.find(
    (u) => u.userName === userName && u.passWord === passWord
  );

  if (!user) {
    return res.status(401).json({
      message: "Sai tài khoản hoặc mật khẩu",
    });
  }
  res.json({
    token: "fake-jwt-token",
    user: {
      id: user.id,
      userName: user.userName,
      role: user.role,
    },
  });
};
