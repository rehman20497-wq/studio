
'use server';

import nodemailer from 'nodemailer';

export interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendEmail(mailOptions: MailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...mailOptions,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // In a real app, you might want to throw a more specific error
    // or handle it in a way that the user can be notified.
    throw new Error('Email sending failed.');
  }
}
