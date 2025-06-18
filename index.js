const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });
// Log the token to verify it's loaded correctly
if (!token) {
  console.error('TELEGRAM_TOKEN is not set in the environment variables.');
  process.exit(1);
} 

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Use /joke to get a random joke.');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show this help message\n/joke - Get a random joke');
});

bot.onText(/\/joke/, async (option) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.data.setup + ' - ' + response.data.punchline)
        .catch(error => 'Sorry, I could not fetch a joke at the moment.');
    const chatId = option.chat.id;
    bot.sendMessage(chatId, joke);
}
);
