import transporter from "../configs/nodeMailer.config.js";

const EMAIL_SERVICE = {

  sendVerificationEmail: async (email, otp, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 500; letter-spacing: 0.5px;">👋️ Hello ${name}</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Use this code to verify your email address:
                            </p>
                            
                            <!-- OTP Box -->
                            <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 3px; margin: 20px 0;">
                                <div style="background-color: #ffffff; border-radius: 6px; padding: 20px 40px;">
                                    <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #667eea; font-family: 'Courier New', monospace;">${otp}</span>
                                </div>
                            </div>
                            
                            <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px;">
                                This code expires in 10 minutes.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; text-align: center; background-color: #fafafa; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © 2024 Your Company. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    })
  },

  sendWelcomeEmail: async (email, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Our Service",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 500; letter-spacing: 0.5px;">Welcome Aboard! 🎉</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 30px; text-align: center;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 400;">Hi ${name},</h2>
                            
                            <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Thank you for joining us! We're excited to have you on board.
                            </p>
                            
                            <!-- CTA Button -->
                            <a href="{{APP_URL}}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 500; margin: 20px 0;">
                                Get Started
                            </a>
                            
                            <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                                If you have any questions, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; text-align: center; background-color: #fafafa; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © 2024 Your Company. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    })
  },

  sendEmailVerifiedConfirmation: async (email, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verified Successfully",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                            <div style="font-size: 64px; margin-bottom: 10px;">✓</div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 500; letter-spacing: 0.5px;">Email Verified!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 30px; text-align: center;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 400;">${name}!</h2>
                            
                            <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Your email has been successfully verified. You're all set!
                            </p>
                            
                            <!-- CTA Button -->
                            
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    })
  }
}



export default EMAIL_SERVICE;