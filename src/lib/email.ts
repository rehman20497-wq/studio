
'use server';

import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

export interface MailOptions {
  to: string;
  bcc?: string | string[];
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
          filename: `${cid}.png`, // Or detect mime type
          path: fullDataUri,
          cid: cid,
        });
      }
    }

    // Replace data URIs with CIDs
    for (const [dataUri, cid] of imageMap.entries()) {
      processedHtml = processedHtml.replace(new RegExp(dataUri, 'g'), `cid:${cid}`);
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: mailOptions.to,
      bcc: mailOptions.bcc,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: processedHtml,
      attachments: attachments,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // In a real app, you might want to throw a more specific error
    // or handle it in a way that the user can be notified.
    throw new Error('Email sending failed.');
  }
}
