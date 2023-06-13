const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seiffsameh00@gmail.com",
      pass: "kjjhbkkqjcdbeqiu",
    },
  });

  const mailOptions = {
    from: email,
    to: "seiffsameh00@gmail.com",
    subject: "Golden Hornet Form",
    text: `Email: ${email}`,
    html: `
    <div style="background-color: #f5f9fa; color: #1e1e1e; padding: 1rem;">
      <p>From: ${email}</p><br/>
      <img src="https://i.ibb.co/TPTynGt/icon-512x512.webp" width="100" height="100" alt="logo" style="border-radius: 50%;"/><br/>
      <p><b>${message}</b></p>
      <p style="font-family: fantasy; font-size: 1.3rem">Golden Hornet</p>
    </div>
    `,
  };

  // Send email to admin
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });

  // Send confirmation email to user
  const confirmMailOptions = {
    from: "seiffsameh00@gmail.com",
    to: email,
    subject: "Golden Hornet Form Confirmation",
    text: `Thank you for contacting us! We will get back to you shortly.`,
    html: `
    <div style="background-color: #f5f9fa; color: #1e1e1e; padding: 1rem;">
      <img src="https://i.ibb.co/TPTynGt/icon-512x512.webp" width="100" height="100" alt="logo" style="border-radius: 50%;"/><br/>
      <p>Thank you for contacting us! We will get back to you shortly.</p></br>
      <p style="font-family: fantasy; font-size: 1.3rem">Golden Hornet</p>
    </div>
    `,
  };

  transporter.sendMail(confirmMailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Confirmation email sent: " + info.response);
    }
  });
};
