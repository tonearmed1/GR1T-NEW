import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    // const token = typeof body.token === "string" ? body.token.trim() : "";
    const message = typeof body.message === "string" ? body.message : "";

    if (!email || !message.trim()) {
      return NextResponse.json({ success: false, message: "Email and message are required." }, { status: 400 });
    }
    // const captchaVerify = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    // });

    // const captchaResult = await captchaVerify.json();

    // if (!captchaResult.success) {
    //   return new Response(JSON.stringify({ message: "Captcha verification failed" }), { status: 400 });
    // }
    // Create a transporter (Gmail by default; supports custom SMTP via env)
    // const useCustomSmtp = Boolean(process.env.SMTP_HOST);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "alnaash899@gmail.com", // Replace with your Microsoft 365 email address
        pass: "mhpd twly pfgi gpix", // Replace with your email password or app-specific password if using 2FA
      },
    });

    const safeMessageHtml = message ? message.replace(/\n/g, "<br>") : "";

    // Email content
    const mailOptions = {
      from: "alnaash899@gmail.com",
      to: "contact@gritmotorcycles.com",
      subject: `New Contact Form Submission${name ? ` from ${name}` : ""}`,
      text: `
        Name: ${name || "Not provided"}
        Email: ${email}
        Phone: ${phone || "Not provided"}

        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessageHtml}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    // console.log("error from api -> ", error);

    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email", error: String(error) }, { status: 500 });
  }
}
