require('dotenv').config();
const { fakerRU: faker} = require('@faker-js/faker');

const { Bot, GrammyError, HttpError } = require('grammy');
const bot = new Bot (process.env.BOT_API_KEY);

bot.command('start', async (ctx) => {
    await ctx.reply(
     'Привет! Я - Бот, который пока только учится выполнять задачи, сейчас всё что я умею - это выдавать рандомные ФИО. Попробуй написать мне любое сообщение!',
    );
});

bot.on("message", async (ctx) => {
await ctx.reply(faker.person.fullName());
});

bot.catch((err) => { const ctx = err.ctx;

console.error(`Error while handling update ${ctx.update.update_id}:`); const e = err.error;

if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) 
        { console.error('Could not contact Telegram:', e);
    } else {
    console.error('Unknown error:', e);
    }
});