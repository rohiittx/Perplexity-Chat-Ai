import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({  // ye hamara web server or smpt server ko connect krta h
//     service: "gmail",
//     auth: {
//         type: "OAuth2",
//         user: process.env.GOOGLE_USER,
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     }
// })

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password h yahan, normal password nahi h
  },
});

transporter.verify()  // verify kr rhe h ki hamara smpt server hamare web server se connect ho gya h ki nhi
.then(()=>{ console.log("Email transporter is ready to send")})
.catch((err)=>{ console.log("Email transporter verification failed:", err)})

export async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent:", details);
  return details;

  } catch (error) {
    console.log("Email sending failed:", error);
    throw error;
  }
}

// export async function sendEmail({to, subject, html, text }) {  // ye function email send krne k liye h

//     const mailOptions = {
//         from: process.env.GOOGLE_USER,
//         to,
//         subject:"OTP Verification",
//         html,
//         text
//     }

//     const details = await transporter.sendMail(mailOptions) // ye function email send krta h
//     console.log("Email sent:", details)
// }