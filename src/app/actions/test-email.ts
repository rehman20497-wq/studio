'use server';

import { sendEmail } from '@/lib/email';

/**
 * Server action to send a test email for debugging SMTP configuration.
 */
export async function testEmailAction() {
  const envStatus = {
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasUser: !!process.env.EMAIL_SERVER_USER,
    hasPass: !!process.env.EMAIL_SERVER_PASSWORD,
    hasFrom: !!process.env.EMAIL_FROM,
  };

  if (!envStatus.hasAdminEmail || !envStatus.hasUser || !envStatus.hasPass || !envStatus.hasFrom) {
    return { 
        success: false, 
        error: { 
            message: 'Environment variables are missing.', 
            details: envStatus 
        } 
    };
  }

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: 'Telsys Debug: SMTP Connection Test',
      text: 'This is a test email sent from the Telsys Admin Debug panel to verify your SMTP and Nodemailer configuration.',
      html: `
        <div style="font-family: sans-serif; padding: 40px; background-color: #f9f9f9; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
            <h2 style="color: #00ADBF;">Email System Test Successful</h2>
            <p>Your SMTP server is correctly configured and authenticated.</p>
            <p><strong>Sent To:</strong> ${process.env.ADMIN_EMAIL}</p>
            <p><strong>Sent Via:</strong> ${process.env.EMAIL_SERVER_USER}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">This is an automated test message from the Telsys Admin Panel.</p>
          </div>
        </div>
      `
    });

    return { 
        success: true, 
        data: { 
            recipient: process.env.ADMIN_EMAIL,
            from: process.env.EMAIL_FROM,
            timestamp: new Date().toISOString()
        } 
    };
  } catch (error: any) {
    console.error('Debug Email Test Failed:', error);
    return { 
        success: false, 
        error: { 
            message: error.message || 'Unknown error occurred while sending email.',
            code: error.code,
            command: error.command
        } 
    };
  }
}
