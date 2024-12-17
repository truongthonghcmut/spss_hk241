const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, text) => {
  // const transporter = nodemailer.createTransport({
  //   host: 'thinhtruong@2109',
  //   port: 465,
  //   secure: true, // use false for STARTTLS; true for SSL on port 465
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASSWORD,
  //   }
  // });
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  

  const otpHtml = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header img {
        max-width: 100px;
        margin-bottom: 20px;
      }
      .header h2 {
        color: #333;
        font-size: 22px;
        margin: 0;
      }
      .otp-box {
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        color: #4a4a4a;
        background-color: #f4f4f8;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #ddd;
        margin: 20px auto;
        letter-spacing: 2px;
        width: fit-content;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #666;
        margin-top: 30px;
      }
      .footer strong {
        color: #333;
      }
      .note {
        text-align: center;
        color: #888;
        font-size: 12px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://t3.ftcdn.net/jpg/01/05/33/22/360_F_105332215_nBSffj3yMoqb7RKK62Rf0pHKgUNdMHoz.jpg" alt="Termii Logo" />
        <h2>Hi there!</h2>
        <p>Please copy the OTP below and paste it in the verification page.</p>
      </div>
      <div class="otp-box">
        ${text}
      </div>
      <div class="footer">
        <p>This code expires in <strong>5 minutes</strong>. Please <strong>DO NOT SHARE</strong> this code with anyone!</p>
      </div>
      <div class="note">
        <p>Need help? Contact <a href="mailto:thinh.truong21092004@hcmut.edu.vn">SwimTeam</a></p>
      </div>
    </div>
  </body>
</html>
`;

  // Configure the mailoptions object
  const mailOptions = {
    from: `"Printing System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: otpHtml
  };
  // Send the email
  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
}