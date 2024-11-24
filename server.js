const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Прокси для перенаправления на Discord
app.use('/', createProxyMiddleware({
    target: 'https://discord.com',
    changeOrigin: true,
    secure: false, // Используется, если есть проблемы с SSL
    onProxyReq: (proxyReq, req, res) => {
        // Обработка запросов, например, добавление заголовков
        proxyReq.setHeader('User-Agent', req.headers['user-agent']);
    },
    onError: (err, req, res) => {
        res.status(500).send('Ошибка прокси-сервера');
    }
}));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
