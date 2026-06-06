import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "Loaded (length: " + process.env.EMAIL_PASSWORD.length + ")" : "Not Loaded");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'av580731@gmail.com', // testing to the admin email
    subject: "Test email from Prescripto script",
    text: "Hello! This is a test mail to check SMTP configuration."
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending mail:", error);
    } else {
        console.log("Email sent successfully:", info.response);
    }
});
