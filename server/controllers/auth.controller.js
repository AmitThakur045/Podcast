const hashService = require("../services/hash.service");
const otpService = require("../services/otp.service");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const UserDto = require("../dtos/user.dto");

class AuthControllers {
  async sendOtp(req, res) {
    const { phone, email } = req.body;

    if (!phone && !email) {
      res.status(400).json({
        message: "Phone or Email field is required",
      });
    }

    const otp = await otpService.generateOtp();
    let type;
    if (phone) type = phone;
    else type = email;

    // time to leave
    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${type}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send OTP
    try {
      if (phone) {
        // await otpService.sendBySms(phone, otp);
      } else if (email) {
        await otpService.sendMail({
          to: email,
          from: "at7129652@gmail.com",
          subject: "Welcome to PodCast",
          text: `Welcome to PODCAST Your OTP is ${otp}`,
          html: `<h1>Welcome to PODCAST</h1>
                  <p>Your OTP is ${otp}</p>`,
        });
      }

      return res.json({
        hash: `${hash}${expires}`,
        phone,
        email,
        otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Otp Sending failed",
      });
    }
  }

  async verifyOtp(req, res) {
    const { otp, phone, email, hash } = req.body;

    if (!otp || !hash || !(phone || email)) {
      return res.status(400).status({ message: "All fields are required" });
    }

    // get the customehashed otp and its expire date(time)
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({
        message: "OTP Expired",
      });
    }

    let type;
    if (phone) type = phone;
    else type = email;

    // custom hash
    const data = `${type}.${otp}.${expires}`;
    // check if the otp is correct or not
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({
        message: "Invalid Otp",
      });
    }

    let user;
    // check if user existed or not
    // if user didn't existed create one
    try {
      if (phone) user = await userService.findUser({ phone: phone });
      else user = await userService.findUser({ email: email });
      if (!user) {
        if (phone) {
          user = await userService.createUser({
            phone: phone,
          });
        } else {
          user = await userService.createUser({
            email: email,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "DataBase Error" });
    }

    // JWT
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    // saving the refresh token to database
    tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // only server can read
    });

    res.cookie("accesstoken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // only server can read
    });

    // transforming the user object
    const userDto = new UserDto(user);
    // making auth true to make client understand that the authentication went smoothly
    res.json({ user: userDto, auth: true });
  }

  async refresh(req, res) {
    // get the refresh token from cookie
    const { refreshtoken: refreshTokenFromCookie } = req.cookies;
    let userData;
    // check if refresh token is valid
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );

      if (!token) {
        return res.status(401).json({ message: "Invalid Token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Error" });
    }

    // check if user is valid
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }

    // generate new Tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    // Update the referesh token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "could not update the refresh token" });
    }

    // update the cookies
    res.cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // only server can read
    });

    res.cookie("accesstoken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // only server can read
    });

    // transforming the user object
    const userDto = new UserDto(user);
    // making auth true to make client understand that the authentication went smoothly
    res.json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    const { refreshtoken } = req.cookies;
    // delete refresh token from db
    await tokenService.removeToken(refreshtoken);
    // delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({
      user: null,
      auth: false,
    });
  }
}

module.exports = new AuthControllers();
