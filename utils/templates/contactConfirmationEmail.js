const contactConfirmationEmail = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            padding: 20px !important;
          }
          .heading {
            font-size: 22px !important;
          }
          .button {
            font-size: 14px !important;
            padding: 12px 24px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f0f2f5; font-family: 'Inter', sans-serif;">
      <div style="padding: 40px;">
        <div class="container" style="max-width: 580px; margin: auto; background-color: #ffffff; border-radius: 16px; padding: 36px; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);">
          <header style="text-align: center; margin-bottom: 28px;">
            <h1 class="heading" style="color: #1f2937; font-size: 28px; font-weight: 600; margin: 0;">
              Thank you, ${name}! 🎉
            </h1>
            <p style="margin-top: 8px; color: #6b7280; font-size: 16px;">
              We appreciate you reaching out.
            </p>
          </header>
          <main style="color: #4b5563; font-size: 16px; line-height: 1.7;">
            <p>We've received your message and someone from our team will get back to you shortly.</p>
            <p>In the meantime, feel free to return to your dashboard and keep up the good work!</p>
          </main>
          <div style="text-align: center; margin-top: 36px;">
            <a href="https://habit-club.vercel.app/dashboard" class="button" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: 600; transition: background-color 0.3s ease;">
              Go to Dashboard →
            </a>
          </div>
          <footer style="margin-top: 40px; font-size: 13px; color: #9ca3af; text-align: center;">
            You received this email because you contacted Habit Club.
          </footer>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default contactConfirmationEmail;
