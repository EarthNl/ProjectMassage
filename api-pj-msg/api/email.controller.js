const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "massagemaingam@gmail.com", // เปลี่ยนเป็นอีเมลของคุณ
      pass: "ckjoqfmtkswkskmm", // ใช้ App Password แทนรหัสจริง
    },
  });

  let mailOptions = {
    from: "massagemaingam@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "อีเมลถูกส่งเรียบร้อย" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "ส่งอีเมลล้มเหลว" });
  }
};
