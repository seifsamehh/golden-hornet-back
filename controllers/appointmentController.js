const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

exports.submitAppointment = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    businessPhone,
    email,
    message,
    date,
  } = req.body;

  const appointment = new Appointment({
    firstName,
    lastName,
    companyName,
    businessPhone,
    email,
    message,
    date,
  });

  try {
    // Save appointment to the MongoDB database
    await appointment.save();

    // Send email to admin
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
      subject: "New appointment request",
      text: `First Name: ${firstName}\nLast Name: ${lastName}\nCompany Name: ${
        companyName || "-"
      }\nBusiness Phone: ${businessPhone}\nEmail: ${email}\nMessage: ${message}\nDate: ${date}`,
      html: `
        <div style="background-color: #f5f9fa; color: #1e1e1e; padding: 1rem;">
          <img src="https://i.ibb.co/TPTynGt/icon-512x512.webp" alt="logo" width="100" height="100" style="border-radius: 50%;" />
          <p>You have a new appointment request:</p>
          <ul>
            <li><b>First Name:</b> ${firstName}</li>
            <li><b>Last Name:</b> ${lastName}</li>
            <li><b>Company Name:</b> ${companyName || "-"}</li>
            <li><b>Business Phone:</b> ${businessPhone}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Message:</b> ${message}</li>
            <li><b>Date:</b> ${date}</li>
          </ul>
          <p style="font-family: fantasy; font-size: 1.3rem">Golden Hornet</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmMailOptions = {
      from: "seiffsameh00@gmail.com",
      to: email,
      subject: "Appointment Request Submitted",
      text: "Thank you for submitting your appointment request. We will get back to you shortly.",
      html: `
        <div style="background-color: #f5f9fa; color: #1e1e1e; padding: 1rem;">
          <img src="https://i.ibb.co/TPTynGt/icon-512x512.webp" alt="logo" width="100" height="100" style="border-radius: 50%;" />
          <p>Thank you for submitting your appointment request.</p>
          <p>We will get back to you shortly.</p>
          <p style="font-family: fantasy; font-size: 1.3rem">Golden Hornet</p>
        </div>
      `,
    };

    await transporter.sendMail(confirmMailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
};
