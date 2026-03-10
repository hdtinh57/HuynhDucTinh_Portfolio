const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, subject, message } = data;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.");
      return { 
        statusCode: 500, 
        body: JSON.stringify({ success: false, error: 'Server configuration error' }) 
      };
    }

    const telegramMessage = `
🤖 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Subject:* ${subject || "Contact from Portfolio"}
💬 *Message:*
${message}

⏰ *Time:* ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}
🌐 *Source:* Portfolio Website
`;

    const payload = JSON.stringify({
      chat_id: CHAT_ID,
      text: telegramMessage,
      parse_mode: "Markdown",
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (d) => { responseBody += d; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ statusCode: 200, body: JSON.stringify({ success: true }) });
          } else {
            console.error('Telegram API Error:', responseBody);
            resolve({ statusCode: 500, body: JSON.stringify({ success: false, error: 'Telegram API Error' }) });
          }
        });
      });

      req.on('error', (e) => {
        console.error('Request Error:', e);
        resolve({ statusCode: 500, body: JSON.stringify({ success: false, error: e.message }) });
      });

      req.write(payload);
      req.end();
    });

  } catch (error) {
    console.error('Handler Error:', error);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};
