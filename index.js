const { Bot } = require("grammy");
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require("cors");

const bot = new Bot(process.env.API_KEY_BOT);

// Команда /start
bot.command("start", (ctx) =>
  ctx.reply(
    `Приветствую<b>${ctx.chat.username ? ", @" + ctx.chat.username : ", " + ctx.chat.first_name}</b>! Ты попал в магазин жидкостей для вейпа <b>LIQUID  LOUNGE</b> 😎, наша официальная группа - https://t.me/LiquidLoungevk, подписывайся и следи за обновлениями!`, {parse_mode: 'HTML'}
  )
);

bot.on("message", async (ctx) => {
  await ctx.reply('Дополнительные функции приложения находятся в разработке, если у вас есть предложения и пожелания, то напишите пожалуйста администратору и в будущих обновлениях мы учтем ваши пожелания! Администратор @Liquid_Lounge'); 
});

// Запуск бота
bot.start();

// Инициализация HTTP-сервера
const app = express();
const PORT = process.env.PORT || 3005;

// Включаем парсинг JSON в запросах
app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());

app.get('/', (req, res) => {
    res.send('Приложение активно, сервер работает!');
    console.log('Кто-то открыл карточку и разбудил бота...');
});


// Эндпоинт для вызова sendHello()
app.post("/sendHello", async (req, res) => {
  const data = req.body;
  if (!data || !data.name || !data.price) {
    return res.status(400).send({ success: false, message: "Некорректное тело запроса." });
  }
  try {
    await bot.api.sendMessage("-1002277090632", `Привет! В приложении оформили заказ ${data.name} на сумму ${data.price} рублей. ID заказа ${data.id}. ${data.username ? 'Пользователь: @' + data.username : ''}`, {parse_mode: 'HTML'});
    res.status(200).send({ success: true, message: "Сообщение отправлено!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Ошибка отправки сообщения." });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
