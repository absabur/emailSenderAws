const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Load host from .env
  port: process.env.SMTP_PORT, // Load port from .env
  secure: false, // Use TLS (587)
  auth: {
    user: process.env.SMTP_USER, // Load user from .env
    pass: process.env.SMTP_PASS, // Load password from .env
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: "absabur929@gmail.com", // Sender address
    to: "absabur929@gmail.com ", // List of receivers (test with your own email)
    subject: "Hello, test email", // Subject line
    text: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden;">
    <tr>
      <td align="center" style="padding: 20px; background-color: #007BFF; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to [Your Company]!</h1>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 40px 20px; background-color: #ffffff;">
        <p style="font-size: 18px; margin-bottom: 20px;">Hello [User's Name],</p>
        <p style="font-size: 16px; margin-bottom: 20px;">Thank you for joining us! We're thrilled to have you on board.</p>
        <p style="font-size: 16px; margin-bottom: 40px;">Start exploring our services and let us know if you have any questions. We're here to help!</p>
        <a href="[Your Link]" style="display: inline-block; padding: 12px 30px; background-color: #007BFF; color: #ffffff; font-size: 16px; text-decoration: none; border-radius: 5px;">Get Started</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px; background-color: #f4f4f4;">
        <p style="font-size: 14px; margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #007BFF; text-decoration: none;">Contact Support</a></p>
        <p style="font-size: 14px; margin: 10px 0;">Follow us on <a href="#" style="color: #007BFF; text-decoration: none;">Facebook</a> | <a href="#" style="color: #007BFF; text-decoration: none;">Twitter</a> | <a href="#" style="color: #007BFF; text-decoration: none;">Instagram</a></p>
      </td>
    </tr>
  </table>
</body>`, // Plain text body
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent: " + info.response);
  } catch (error) {
    res.status(500).send("Error sending email: " + error.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
