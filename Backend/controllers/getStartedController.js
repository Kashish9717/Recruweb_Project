import GetStarted from "../models/GetStarted.js";
import nodemailer from "nodemailer";

// SAFE MAILER (won't crash server)
const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })
    : null;

// CREATE
export const createGetStarted = async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      employees,
      services,
      message
    } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !employees) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const submission = await GetStarted.create({
      companyName,
      contactPerson,
      email,
      phone,
      employees,
      services,
      message
    });

    // EMAIL (non-blocking)
    if (transporter) {
      transporter
        .sendMail({
          from: process.env.FROM_EMAIL || "no-reply@recruweb.com",
          to: process.env.ADMIN_EMAIL,
          subject: `New Get Started - ${companyName}`,
          html: `
            <h2>New Request</h2>
            <p><b>Company:</b> ${companyName}</p>
            <p><b>Contact:</b> ${contactPerson}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Employees:</b> ${employees}</p>
            <p><b>Services:</b> ${services?.join(", ")}</p>
            <p><b>Message:</b> ${message}</p>
          `
        })
        .catch((err) => console.log("Email failed:", err.message));
    }

    return res.status(201).json({
      success: true,
      message: "Submitted successfully",
      data: submission
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// GET ALL
export const getGetStartedSubmissions = async (req, res) => {
  try {
    const data = await GetStarted.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// GET ONE
export const getGetStarted = async (req, res) => {
  try {
    const data = await GetStarted.findById(req.params.id);

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// UPDATE
export const updateGetStartedStatus = async (req, res) => {
  try {
    const data = await GetStarted.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};