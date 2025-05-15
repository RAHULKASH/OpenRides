import nodemailer from 'nodemailer';

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com", // Corrected host
  port: 465,
  secure: true, // Use true for 465, false for other ports
  auth: {
    user: "Eventora123@gmail.com", // Replace with your actual email
    pass: "migl quhl hotv uipv", // Replace with your app password
  },
});

// Function to send event registration email
async function mailForEventRegistration(user, event) {
  console.log(user);
  console.log(event);
  try {
    const info = await transporter.sendMail({
      from: '"EventOra 👻" <Eventora123@gmail.com>', // Sender address
      to: user.email, // Recipient email
      subject: "Successful Registration in Event",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Event Registration Confirmation</title>
            <style>
                body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
                .header { background-color: #4caf50; color: #ffffff; text-align: center; padding: 20px; }
                .content { padding: 20px; color: #333; }
                .content h2 { color: #4caf50; }
                .content ul { list-style: none; padding: 0; }
                .content ul li { margin: 10px 0; background: #f9f9f9; padding: 10px; border-radius: 5px; }
                .cta a { text-decoration: none; color: #ffffff; background-color: #4caf50; padding: 10px 20px; border-radius: 5px; display: inline-block; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>EventOra</h1>
                </div>
                <div class="content">
                    <h2>Congratulations, ${user.name}!</h2>
                    <p>You’ve successfully registered for the event:</p>
                    <ul>
                        <li><strong>Event Name:</strong> ${event.event_name}</li>
                        <li><strong>Date:</strong> ${event.event_date}</li>
                        <li><strong>Time:</strong> ${event.event_time}</li>
                        <li><strong>Location:</strong> ${event.event_location}</li>
                    </ul>
                    <p>We’re thrilled to have you join us! If you have questions, contact us at <a href="mailto:support@eventora.com">support@eventora.com</a>.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    console.log("Event registration email sent: %s", user.email);
  } catch (error) {
    console.error("Error sending event registration email:", error);
  }
}

// Function to send welcome email
async function mailForRegistration(user) {
  try {
    const info = await transporter.sendMail({
      from: '"EventOra 👻" <Eventora123@gmail.com>', // Sender address
      to: user.email, // Recipient email
      subject: "Welcome to EventOra!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
            <style>
                body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .email-container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
                .header { background-color: #4caf50; color: #ffffff; text-align: center; padding: 20px; }
                .content { padding: 20px; color: #333; }
                .cta a { text-decoration: none; background-color: #4caf50; color: #ffffff; padding: 10px 20px; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to EventOra!</h1>
                </div>
                <div class="content">
                    <p>Hi ${user.name},</p>
                    <p>We’re excited to have you on board! Start exploring and registering for events today.</p>
                </div>
                <div class="cta">
                    <a href="#">Get Started</a>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent: %s", user.email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

// Export functions
export { mailForRegistration, mailForEventRegistration };
