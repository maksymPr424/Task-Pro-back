import path from 'path';
import { TEMPLATES_DIR } from '../constants/support.js';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import { sendEmail } from '../utils/sendMailSupport.js';
import { env } from '../utils/env.js';

export const sendSupportEmail = async (userEmail, comment) => {
    const supportTemplatePath = path.join(TEMPLATES_DIR, 'support-email.html');
    const templateSource = await fs.readFile(supportTemplatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template({ userEmail, comment });

    const mailOptions = {
      from: env('SMTP_FROM'),
      to: 'taskpro.project@gmail.com',
      subject: 'Support Request',
      html,
    };

    await sendEmail(mailOptions);
  };
