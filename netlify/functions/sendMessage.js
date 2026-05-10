const https = require('https');

const LIMITS = {
  name: 100,
  email: 120,
  subject: 160,
  message: 2000,
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function sanitizeText(value, maxLength) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function validatePayload(body) {
  const data = JSON.parse(body || '{}');
  const name = sanitizeText(data.name, LIMITS.name);
  const email = sanitizeText(data.email, LIMITS.email);
  const subject = sanitizeText(data.subject || 'Contact from Portfolio', LIMITS.subject);
  const message = sanitizeText(data.message, LIMITS.message);

  if (name.length < 2) return { error: 'Name must be at least 2 characters.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (message.length < 10) return { error: 'Message must be at least 10 characters.' };

  return { value: { name, email, subject, message } };
}

function sendTelegramMessage(botToken, chatId, text) {
  const payload = JSON.stringify({
    chat_id: chatId,
    text,
  });

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
          return;
        }
        reject(new Error(`Telegram API responded with ${res.statusCode}: ${responseBody}`));
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram environment variables.');
    return jsonResponse(500, { success: false, error: 'Server configuration error.' });
  }

  let payload;
  try {
    payload = validatePayload(event.body);
  } catch {
    return jsonResponse(400, { success: false, error: 'Invalid request body.' });
  }

  if (payload.error) {
    return jsonResponse(400, { success: false, error: payload.error });
  }

  const { name, email, subject, message } = payload.value;
  const telegramMessage = [
    'New Portfolio Contact',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    message,
    '',
    `Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
  ].join('\n');

  try {
    await sendTelegramMessage(botToken, chatId, telegramMessage);
    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error('Telegram delivery failed:', error);
    return jsonResponse(502, { success: false, error: 'Message delivery failed.' });
  }
};
