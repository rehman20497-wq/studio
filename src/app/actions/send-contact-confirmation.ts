
'use server';

import { sendEmail } from '@/lib/email';
import { randomBytes } from 'crypto';

interface ContactFormData {
  name: string;
  email: string;
  companyName?: string;
  service: string;
  message: string;
}

export async function sendContactConfirmation(formData: ContactFormData) {
  if (!process.env.ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is not set.');
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://telsysinc.com';
  const messageId = randomBytes(4).toString('hex').toUpperCase();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${appUrl}/about`;

  // Email to the user
  await sendEmail({
    to: formData.email,
    subject: `Your Message to Telesys Has Been Received (ID: ${messageId})`,
    text: `Hello ${formData.name},\n\nThank you for reaching out. We have received your message and will get back to you as soon as possible.\n\nHere is a copy of your message:\n${formData.message}\n\nBest regards,\nThe Telesys Team`,
    html: `
      <div style="background-color: #0a0a0a; color: #f0f0f0; font-family: 'Inter', Arial, sans-serif; padding: 40px; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 20px; overflow: hidden; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0, 173, 191, 0.2);">
          
          <div style="padding: 40px; text-align: left; border-bottom: 1px solid #333; position: relative;">
           <!-- Logo + GIF -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 0;">
  <tr style="height: 70px;">
    <!-- Logo on the left -->
    <td align="left" valign="top" style="padding: 0;">
      <img 
        src="${appUrl}/mob1.png" 
        alt="Telesys Logo" 
        width="220" 
        style="display: block; max-width: 220px; height: auto; line-height: 0; font-size: 0;" 
      />
    </td>

    <!-- GIF on the right -->
    <td align="right" valign="top" style="padding: 0;">
      <img 
        src="${appUrl}/cont.gif" 
        alt="New" 
        width="70" 
        height="70" 
        style="display: block; line-height: 0; font-size: 0;" 
      />
    </td>
  </tr>
</table>

            
            <h1 style="font-family: 'Raleway', Arial, sans-serif; font-size: 28px; color: #ffffff; margin-bottom: 20px;">
              Your Message is in Good Hands.
            </h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #b3b3b3; margin-bottom: 30px;">
              Hello ${formData.name},<br><br>
              Thank you for reaching out. We've successfully received your message. Our team is already reviewing it and will get back to you as soon as possible—usually within 24 hours.
            </p>
            
            <div style="background-color: #222; border-radius: 10px; padding: 20px; border-left: 3px solid #00ADBF;">
              <h3 style="font-size: 14px; color: #00ADBF; margin: 0 0 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Your Submitted Details</h3>
              <p style="font-size: 14px; color: #a0a0a0; margin: 0;"><strong>Service:</strong> ${formData.service}</p>
              <p style="font-size: 14px; color: #a0a0a0; margin: 5px 0 0;"><strong>Message Reference ID:</strong> #${messageId}</p>
            </div>

            <div style="margin-top: 30px; text-align: center; background-color: #222; padding: 20px; border-radius: 10px;">
                <h3 style="font-size: 14px; color: #00ADBF; margin: 0 0 10px; font-weight: bold; letter-spacing: 1px;">MEET THE TEAM</h3>
                <img src="${qrCodeUrl}" alt="QR Code to About Page" style="width: 120px; height: 120px; margin: 0 auto 10px; border: 4px solid #333; border-radius: 8px;">
                <p style="font-size: 12px; color: #a0a0a0; margin: 0;">Scan to learn more about us!</p>
            </div>
            
            <p style="font-size: 14px; color: #b3b3b3; margin-top: 30px;">
              If your inquiry is urgent, you can reply directly to this email.
            </p>
          </div>
          
          <div style="background-color: #000; padding: 20px 40px; font-size: 12px; color: #666; text-align: center;">
            <p><strong>Telesys Inc.</strong> | 401 N Michigan Ave, Chicago, IL | <a href="mailto:Info@telsysinc.com" style="color: #00ADBF; text-decoration: none;">support@telesys.com</a></p>
            <p style="margin-top: 10px;">This is an automated confirmation. No further action is required.</p>
          </div>
        </div>
      </div>
    `,
  });

  // Notification to the admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `🚀 New Contact Form Submission from ${formData.name} [${formData.service}]`,
    text: `You have received a new message from your website contact form.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.companyName || 'N/A'}\nService of Interest: ${formData.service}\n\nMessage:\n${formData.message}`,
    html: `
      <div style="background-color: #f4f7f6; font-family: 'Inter', Arial, sans-serif; padding: 30px;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 25px rgba(0,0,0,0.08); overflow: hidden;">
          <div style="background: linear-gradient(135deg, #003B4E 0%, #005F79 100%); color: white; padding: 25px; text-align: center;">
            <h2 style="margin: 0; font-size: 24px; font-family: 'Raleway', Arial, sans-serif;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 30px;">
            <h3 style="font-size: 16px; color: #005F79; margin: 0 0 15px; border-bottom: 2px solid #eef2f1; padding-bottom: 10px;">👤 User Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333; width: 120px;">Name:</td>
                <td style="padding: 10px 0; color: #555;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333;">Email:</td>
                <td style="padding: 10px 0; color: #555;">
                  <a href="mailto:${formData.email}" style="color: #00ADBF; text-decoration: none;">${formData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333;">Company:</td>
                <td style="padding: 10px 0; color: #555;">${formData.companyName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #333;">Service:</td>
                <td style="padding: 10px 0; color: #555;">${formData.service}</td>
              </tr>
            </table>

            <h3 style="font-size: 16px; color: #005F79; margin: 25px 0 15px; border-bottom: 2px solid #eef2f1; padding-bottom: 10px;">💬 Message</h3>
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; font-size: 14px; line-height: 1.7; color: #444; white-space: pre-wrap; word-wrap: break-word;">
              ${formData.message}
            </div>
          </div>
          <div style="background-color: #f4f7f6; padding: 15px 30px; text-align: center; font-size: 12px; color: #888;">
            <p>Submitted On: ${new Date().toUTCString()}</p>
            <p>Reference ID: #${messageId}</p>
          </div>
        </div>
      </div>
    `,
  });
}
