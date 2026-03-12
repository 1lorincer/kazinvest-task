<h1>Chat app</h1>

<h2>Client часть</h2>

<b>Зависимости</b>

```
cd ./client && npm i
```

<b>Локальный запуск</b>

```
npm run dev
```

<b>Сборка</b>

```
npm run build
```

<h2>Server часть</h2>

<b>Зависимости</b>

```
cd ./server && npm i
```

<b>Локальный запуск (dev)</b>

```
npm run dev
```

<b>Prod запуск</b>

```
npm run start
```

<h2>Деплой</h2>
root package json: <br/>
<b>build</b> — собирает фронтенд:

1. `cd client` — переходит в папку клиента
2. `npm install` — ставит зависимости (Vue, Vite, Tailwind и т.д.)
3. `npm run build-only` — запускает `vite build`, который компилирует Vue-приложение в статические файлы (
   `client/dist/`)

<b>start</b> — запускает сервер:

1. `cd server` — переходит в папку сервера
2. `npm install --omit=dev` — ставит только production-зависимости (Express, Gemini SDK и т.д., без nodemon)
3. `node server.js` — запускает Express, который раздаёт API + собранный фронтенд

<b>Переменные окружения</b>

```
GEMINI_API_KEY=<ваш ключ>
PORT=10000
NODE_ENV=production
```
