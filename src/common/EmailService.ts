import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import sgMail from '@sendgrid/mail';

export class EmailService {
  
  public async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
    const sender = 'verification@duro-omega.xyz';
    const msg: MailDataRequired = {
        from: sender,
        to: email,
        subject: 'Account Verification',
        html: this.generateVerificationEmailHTML(verificationToken)
      };
    try {
      if (process.env.NODE_ENV === 'development') {
        // Use Mailtrap configuration
        const mailtrapTransport = {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'MAILTRAP_USERNAME',
            pass: 'MAILTRAP_PASSWORD',
          },
        };
        sgMail.send({ ...msg, ...mailtrapTransport });
      } else {
        // Use SendGrid configuration
        sgMail.setApiKey('SENDGRID_API_KEY');
        await sgMail.send(msg);
      }

      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }
  private generateVerificationEmailHTML(verificationToken: string): string {
    const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://example.com'
    : 'http://localhost:3000'; 

    const verificationURL = `${baseUrl}/verify?token=${verificationToken}`;
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* Tailwind CSS styles */
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.7/dist/tailwind.min.css');
        </style>
      </head>
      
      <body>
        <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div class="mt-6">
                <div class="text-center">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Duro Account Verification
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Please verify your email address to activate your account.
                  </p>
                </div>
                <div class="mt-8">
                  <div class="text-center">
                    <a href="${verificationURL}"
                      class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Verify Email
                    </a>
                  </div>
                </div>
                <div class="mt-6 text-center">
                  <p class="text-sm text-gray-500">
                    If you're having trouble clicking the button, you can also copy and paste the following link into your
                    browser:
                  </p>
                  <p class="mt-1 text-sm text-gray-900">
                    <a href="${verificationURL}" class="font-medium text-blue-600 hover:text-blue-500">
                      ${verificationURL}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      
      </html>
    `;

    return htmlContent;
  }
}