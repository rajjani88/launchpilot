import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
  }

  async sendWelcomeEmail(to: string, name: string) {
    return this.resend.emails.send({
      from: 'LaunchPilot <onboarding@launchpilot.dev>',
      to,
      subject: 'Welcome to LaunchPilot!',
      html: `<p>Hi ${name}, welcome aboard. Let's audit some apps!</p>`,
    });
  }

  async sendAuditCompleteEmail(to: string, appName: string, auditLink: string) {
    return this.resend.emails.send({
      from: 'LaunchPilot <notifications@launchpilot.dev>',
      to,
      subject: `Your AI Audit for ${appName} is ready`,
      html: `<p>Good news! We finished auditing <strong>${appName}</strong>.</p>
             <p>View your results here: <a href="${auditLink}">Audit Dashboard</a></p>`,
    });
  }
}
