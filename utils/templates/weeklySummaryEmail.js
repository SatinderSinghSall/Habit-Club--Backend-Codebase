const generateWeeklySummaryEmail = ({
  name,
  totalHabits,
  highestStreak,
  missedCheckIns,
}) => `
  <html>
    <body style="font-family: sans-serif; background: #f7f9fc; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 0 12px rgba(0,0,0,0.05);">
        <h2 style="color: #4f46e5; text-align: center;">🗓️ Your Weekly Habit Summary</h2>
        <p>Hi <strong>${name}</strong>, here’s how your week went:</p>

        <ul style="list-style: none; padding: 0; margin-top: 20px;">
          <li>✅ <strong>${totalHabits}</strong> habits tracked</li>
          <li>🔥 <strong>${highestStreak}</strong> days highest streak</li>
          <li>📉 <strong>${missedCheckIns}</strong> missed check-ins</li>
        </ul>

        <blockquote style="margin-top: 30px; padding: 20px; background: #eef2ff; border-left: 4px solid #6366f1; border-radius: 6px;">
          “Success is the sum of small efforts, repeated day in and day out.” — Robert Collier
        </blockquote>

        <p style="text-align: center; color: #888; margin-top: 40px;">Keep going — you're doing amazing! 💪</p>
        <p style="text-align: center; font-size: 14px; color: #bbb;">Habit Club • habitclub.com</p>
      </div>
    </body>
  </html>
`;

export default generateWeeklySummaryEmail;
