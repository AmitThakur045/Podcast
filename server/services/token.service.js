const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh.model");

const accessTokenSeceret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSeceret, {
      expiresIn: "1h",
    });
    // refresh token will be used to generate referesh token
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSeceret);
  }
}

module.exports = new TokenService();
