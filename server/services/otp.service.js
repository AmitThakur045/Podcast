const crypto = require("crypto");
const hashService = require("./hash.service");
const sgMail = require("@sendgrid/mail");

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyloading: true,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class OtpService {
  async generateOtp() {
    // genrating an otp of range 1000-9999
    const opt = crypto.randomInt(1000, 9999);
    return opt;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your PODCAST otp is ${otp}`,
    });
  }

  async sendMail(msg) {
    try {
      await sgMail.send(msg);
    } catch (err) {
      console.log(err);

      if (err.resposne) {
        console.log(err.response.body);
      }
    }
  }

  async verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return hashedOtp === computedHash;
  }
}

module.exports = new OtpService();
