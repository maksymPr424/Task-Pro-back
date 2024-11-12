import path from 'path';
import { TEMPLATES_DIR } from '../constants/support.js';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import { sendEmail } from '../utils/sendMailSupport.js';
import { env } from '../utils/env.js';
import { verifyEmailEmailable } from './emailVerification.js';

export const sendSupportEmail = async (userEmail, comment) => {
  const verificationResponse = await verifyEmailEmailable(userEmail);
  if (verificationResponse.state !== 'deliverable') {
    throw new Error('Invalid or non-existent email address');
  }

  const supportTemplatePath = path.join(TEMPLATES_DIR, 'support-email.html');
  const supportTemplateSource = await fs.readFile(supportTemplatePath, 'utf8');
  const supportTemplate = handlebars.compile(supportTemplateSource);
  const supportHtml = supportTemplate({ userEmail, comment });

  const userTemplatePath = path.join(
    TEMPLATES_DIR,
    'user-confirmation-email.html',
  );
  const userTemplateSource = await fs.readFile(userTemplatePath, 'utf8');
  const userTemplate = handlebars.compile(userTemplateSource);
  const userHtml = userTemplate({
    userEmail,
    comment,
    solutions: [
      'Restart the application or device',
      'Clear the application cache in device settings',
      'Check the stability of your internet connection (Wi-Fi or mobile data)',
      'Update the application to the latest version in the app store',
      'Check for available storage on your device',
      'Check if your username and password are entered correctly.',
      'Clear the application cache in device settings.',
      'Ensure that the app has the necessary permissions to function properly.',
      'Log out and then log back into your account.',
      'Try using a different browser or device if you encounter issues on the web app.',
      'Disable any VPN or proxy that may be interfering with the connection.',
    ],
  });

  const supportMailOptions = {
    from: env('SMTP_FROM'),
    to: 'taskpro.project@gmail.com',
    subject: 'New Support Request',
    html: supportHtml,
  };

  const userMailOptions = {
    from: env('SMTP_FROM'),
    to: userEmail,
    subject: 'Your Support Request Has Been Received',
    html: userHtml,
  };

  await sendEmail(supportMailOptions);
  await sendEmail(userMailOptions);
};
