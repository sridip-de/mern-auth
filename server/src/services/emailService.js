import transporter from "../config/emailConfig.js";

const EMAIL_SERVICE = {

  sendVerificationEmail: async (email, otp) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification",
      html: `<p>Your OTP for email verification is: <b>${otp}</b></p>`,
    })
  },

  sendWelcomeEmail: async (email, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Our Service",
      html: `<h1>Welcome, ${name}!</h1><p>Thank you for joining our service.</p>`,
    })
  }
}

export default EMAIL_SERVICE;