const hashService = require("../services/hash.service");
const otpService = require("../services/otp.service");

class AuthControllers {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({
        message: "Phone field is required",
      });
    }

    const otp = await otpService.generateOtp();

    // time to leave
    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send OTP
    try {
      await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}${expires}`,
        phone,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Otp Sending failed",
      });
    }
  }

  async verifyOtp() {
    const { otp, phone, hash } = req.body;

    if (!otp || !phone || !hash) {
      return res.status(400).status({ message: "all fiels are required" });
    }

    const [hashedOtp, expires] = has.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({
        message: "OTP Expired",
      });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({
        message: "Invalid Otp",
      });
    }

    let user, accessToken, refreshToken;
    
  }
}

module.exports = new AuthControllers();
