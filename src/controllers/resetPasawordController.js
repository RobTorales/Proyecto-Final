import nodemailer from "nodemailer";
import { userModel } from "../dao/models/user.model.js";
import crypto from "crypto";
import { GMAIL_USER, GMAIL_PASS } from "../config/config.js";

const sendResetPasswordEmail = async (userEmail) => {
  const user = await userModel.findOne({ email: userEmail });
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; 
  await user.save();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:8000/reset-password/${resetToken}`;
  let mailOptions = {
    from: "tuemail@example.com",
    to: userEmail,
    subject: "Link de restablecimiento de contraseña",
    text: `Por favor, para restablecer tu contraseña haz clic en el siguiente enlace: ${resetUrl}`,
    html: `<p>Por favor, para restablecer tu contraseña haz clic en el siguiente enlace: <a href="${resetUrl}">restablecer contraseña</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendResetPasswordEmail;
