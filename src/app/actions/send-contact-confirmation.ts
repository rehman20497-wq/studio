
'use server';

import { sendEmail } from '@/lib/email';

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

  // Email to the user
  await sendEmail({
    to: formData.email,
    subject: 'We\'ve Received Your Message',
    text: `Hello ${formData.name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nHere is a copy of your message:\n${formData.message}\n\nBest regards,\nThe Telesys Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>We've Received Your Message!</h2>
        <p>Hello ${formData.name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        <hr>
        <p><strong>Here is a copy of your message:</strong></p>
        <p><em>"${formData.message}"</em></p>
        <hr>
        <p>Best regards,<br>The Telesys Team</p>
      </div>
    `,
  });

  // Notification to the admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission from ${formData.name}`,
    text: `You have received a new message from your website contact form.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.companyName || 'N/A'}\nService of Interest: ${formData.service}\n\nMessage:\n${formData.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.companyName || 'N/A'}</p>
        <p><strong>Service of Interest:</strong> ${formData.service}</p>
        <h3>Message:</h3>
        <p>${formData.message}</p>
      </div>
    `,
  });
}
