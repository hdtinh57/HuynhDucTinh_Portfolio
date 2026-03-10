const fs = require('fs');
// Load local .env file if it exists (for local testing without deployment)
try {
  const envFile = fs.readFileSync('.env', 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove surrounding quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (e) {
  // Ignore error if .env is missing (e.g., in production where env vars are injected)
}

const configContent = `// Auto-generated during build from environment variables
window.TELEGRAM_BOT_TOKEN = "${process.env.TELEGRAM_BOT_TOKEN || ''}";
window.TELEGRAM_CHAT_ID = "${process.env.TELEGRAM_CHAT_ID || ''}";
`;

fs.writeFileSync('config.js', configContent);
console.log('✅ Generated config.js successfully!');
