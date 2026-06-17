'use server';

import { sendEmail } from '@/lib/email';

/**
 * Server action to send a test email for debugging SMTP configuration.
 * Using named export for better Next.js action registration.
 */
export const testEmailAction = async () => {
  const envStatus = {
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasUser: !!process.env.EMAIL_SERVER_USER,
    hasPass: !!process.env.EMAIL_SERVER_PASSWORD,
  };

  if (!envStatus.hasAdminEmail || !envStatus.hasUser || !envStatus.hasPass) {
    return { 
        success: false, 
        error: { 
            message: 'Email environment variables are missing on the server.', 
            details: envStatus 
        } 
    };
  }

  try {
    const recipient = process.env.ADMIN_EMAIL!;
    
    await sendEmail({
      to: recipient,
      subject: 'Telsys Connection Test: Success',
      text: 'Your email system is successfully configured and authenticated.',
      html: `
        <div style="font-family: sans-serif; padding: 40px; background-color: #f9f9f9; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #00ADBF; margin-top: 0;">Connection Successful</h2>
            <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6;">This is a test message to confirm that your <strong>Telsys Admin</strong> SMTP settings are correct.</p>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Sent To:</strong> ${recipient}</p>
                <p style="margin: 5px 0 0; font-size: 14px; color: #475569;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <p style="font-size: 14px; color: #64748b;">You can now use the newsletter and contact features with confidence.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">This is an automated system test.</p>
          </div>
        </div>
      `
    });

    return { 
        success: true, 
        data: { 
            recipient,
            timestamp: new Date().toISOString()
        } 
    };
  } catch (error: any) {
    console.error('SMTP Test Error:', error);
    return { 
        success: false, 
        error: { 
            message: error.message || 'SMTP Authentication or Delivery failed.',
            code: error.code,
            command: error.command
        } 
    };
  }
}
