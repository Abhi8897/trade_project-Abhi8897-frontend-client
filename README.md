# trade_project
This repository is the starting template

The repository includes four files:

- index.html : main page of the application
- trades.html: the listing page
- trade.html: the individual item page
- newTrade.html: adding new item page
## React Client (Frontend Showcase)

This repo now includes a **React + TypeScript** client app in `client/` that consumes a small JSON API from the Express server.

### Run (dev)

Terminal 1 (server):

```bash
npm install
node app.js
# server: http://localhost:3005
```

Terminal 2 (client):

```bash
cd client
npm install
npm run dev
# client: http://localhost:5173
```

The client proxies `/api` requests to the server (see `client/vite.config.ts`), so cookies/sessions work in local dev.

### API used by the client

- `GET /api/games`
- `GET /api/games/:id`
- `GET /api/me`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/games/:id/watch`
- `POST /api/games/:id/unwatch`

### Suggested frontend talking points (interview)

- React Router pages, reusable components, loading/error/empty states
- Fetch wrapper with typed responses and session cookies (`credentials: 'include'`)
- Search/filter UX and watchlist interactions without page reload
