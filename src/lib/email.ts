import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

export interface MailOptions {
  to: string;
  bcc?: string | string[];
  subject: string;
  text: string;
  html: string;
}

/**
 * Utility to send emails via SMTP.
 * This is a server-side utility, but does not need 'use server' at the top
 * as it is imported by Server Actions.
 */
export async function sendEmail(mailOptions: MailOptions) {
  // Create transporter inside the function to ensure fresh env variables in serverless
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    let processedHtml = mailOptions.html;
    const attachments: any[] = [];
    const imageMap = new Map<string, string>();

    // Find all data URI images
    const dataUriRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"/g;
    let match;
    while ((match = dataUriRegex.exec(mailOptions.html)) !== null) {
      const base64Data = match[1];
      const fullDataUri = match[0].split('src="')[1].split('"')[0];

      if (!imageMap.has(fullDataUri)) {
        const cid = `${randomBytes(8).toString('hex')}@telesys.email`;
        imageMap.set(fullDataUri, cid);
        
        attachments.push({
          filename: `${cid}.png`,
          path: fullDataUri,
          cid: cid,
        });
      }
    }

    // Replace data URIs with CIDs
    for (const [dataUri, cid] of imageMap.entries()) {
      processedHtml = processedHtml.replace(new RegExp(dataUri, 'g'), `cid:${cid}`);
    }

    const fromAddress = process.env.EMAIL_FROM || `Telsys Admin <${process.env.EMAIL_SERVER_USER}>`;

    await transporter.sendMail({
      from: fromAddress,
      to: mailOptions.to,
      bcc: mailOptions.bcc,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: processedHtml,
      attachments: attachments,
    });
  } catch (error: any) {
    console.error('Failed to send email:', error);
    throw new Error(error.message || 'Email sending failed.');
  }
}
