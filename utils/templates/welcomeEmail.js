const welcomeEmail = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            padding: 24px !important;
          }
          .heading {
            font-size: 20px !important;
          }
          .button {
            padding: 12px 20px !important;
            font-size: 14px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Inter', sans-serif;">
      <div style="padding: 40px;">
        <div class="container" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);">
          <header style="text-align: center; margin-bottom: 24px;">
            <h1 class="heading" style="color: #111827; font-size: 24px; margin: 0;">
              Welcome to <span style="color: #6366f1;">Habit Club</span>, ${name}! 👋
            </h1>
          </header>
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
            We're thrilled to have you on board! Habit Club is your new home for building better habits — one day at a time.
          </p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
            Here’s how to get started:
          </p>
          <ul style="font-size: 16px; color: #374151; line-height: 1.8; padding-left: 20px; margin: 0 0 24px;">
            <li><strong>✅ Add your first habit</strong></li>
            <li><strong>📆 Check in daily</strong></li>
            <li><strong>🎯 Join a group for motivation</strong></li>
          </ul>
          <div style="text-align: center; margin-top: 32px;">
            <a href="https://habit-club.vercel.app/dashboard" class="button" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600;">
              Go to Dashboard →
            </a>
          </div>
          <footer style="margin-top: 40px; font-size: 13px; color: #9ca3af; text-align: center;">
            You’re receiving this email because you signed up for Habit Club.<br>If this wasn’t you, feel free to ignore it.
          </footer>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default welcomeEmail;
