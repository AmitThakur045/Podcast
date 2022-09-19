const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh.model");

const accessTokenSeceret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSeceret, {
      expiresIn: "10d",
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
    // return payload if it's valid
    return jwt.verify(token, accessTokenSeceret);
  }

  async verifyRefreshToken(refreshToken) {
    // return payload if it's valid
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refreshToken,
    });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne({ userId }, { token: refreshToken });
  }

  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
