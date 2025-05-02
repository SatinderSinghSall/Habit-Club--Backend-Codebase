const contactEmail = ({ name, email, message }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            padding: 20px !important;
          }
          .heading {
            font-size: 22px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', sans-serif;">
      <div style="padding: 40px;">
        <div class="container" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);">
          <header style="text-align: center; margin-bottom: 24px;">
            <h1 class="heading" style="color: #111827; font-size: 26px; margin: 0;">
              📬 New Contact Form Submission
            </h1>
          </header>
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            <strong>Name:</strong> ${name}<br />
            <strong>Email:</strong> ${email}
          </p>
          <div style="background-color: #f3f4f6; padding: 16px; border-left: 4px solid #6366f1; border-radius: 8px; color: #374151; font-size: 15px;">
            <strong>Message:</strong><br />
            ${message}
          </div>
          <footer style="margin-top: 40px; font-size: 13px; color: #9ca3af; text-align: center;">
            This message was received via the Habit Club contact form.
          </footer>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default contactEmail;
