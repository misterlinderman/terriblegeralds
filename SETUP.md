# Setup Guide — Terrible Gerald's Pizza

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (free tier works)
- Auth0 account (free tier works)
- Git

---

## 1. Install dependencies

From the repository root:

```bash
npm run install:all
```

---

## 2. Environment files

```bash
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env
```

---

## 3. MongoDB Atlas

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist your IP (or `0.0.0.0/0` for dev).
3. Copy the connection string into `server/.env`:

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/terriblegeralds?retryWrites=true&w=majority
```

---

## 4. Auth0 (admin access)

### Application (SPA)

1. Auth0 Dashboard → Applications → Create Application → **Single Page Application**
2. Name: `Terrible Gerald's Admin`
3. Allowed Callback URLs: `http://localhost:5173`, `https://YOUR-VERCEL-DOMAIN.vercel.app`
4. Allowed Logout URLs: same as above
5. Allowed Web Origins: same as above
6. Copy **Domain** and **Client ID** to `client/.env`:

```
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=http://localhost:3001/api
```

### API

1. Applications → APIs → Create API
2. Name: `Terrible Gerald's API`
3. Identifier: `http://localhost:3001/api` (production: use your Railway API URL + `/api`)
4. Copy to `server/.env`:

```
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=http://localhost:3001/api
```

### Admin users

Add authorized admin emails to `server/.env`:

```
ADMIN_EMAILS=owner@terriblegeralds.com,you@example.com
```

Optional: add Auth0 permission `admin:content` to users via an Auth0 Action or Role instead of email allowlist.

---

## 5. Contact form email (optional)

New inquiries are always saved to MongoDB. To also send email notifications via [Resend](https://resend.com), add to `server/.env`:

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_NOTIFICATION_EMAIL=terriblegeralds@gmail.com
EMAIL_FROM=Terrible Gerald's Pizza <inquiries@terriblegeralds.com>
```

Without `RESEND_API_KEY`, submissions still work — email is skipped with a server log warning.

Catering zip validation uses Omaha (68104) as origin with a 40-mile radius by default. Override with `CATERING_ORIGIN_LAT`, `CATERING_ORIGIN_LNG`, and `CATERING_MAX_DISTANCE_MILES` if needed.

---

## 6. Seed legacy content

Loads menu items, FAQs, and site copy extracted from the Astro build:

```bash
npm run seed
```

Events are **not** included in the main seed. After first admin login, either:

- Add events at `/admin/events`, or
- Run `npm run seed:events` for a sample Barry O's Tavern event

---

## 7. Run locally

```bash
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173 | Public website |
| http://localhost:5173/admin/login | Admin login |
| http://localhost:3001/api/health | API health check |

---

## 8. Production deployment

See [docs/deployment/DEPLOYMENT.md](./docs/deployment/DEPLOYMENT.md) for Vercel (client) and Railway (server) steps.

---

## Troubleshooting

**401 on admin routes** — Confirm `VITE_AUTH0_AUDIENCE` matches `AUTH0_AUDIENCE` and Auth0 API identifier exactly.

**403 Admin access required** — Add your Auth0 user email to `ADMIN_EMAILS` in Railway/server env.

**CORS errors in production** — Set `CLIENT_URL` on Railway to your Vercel domain (no trailing slash).

**Empty menu/FAQs** — Run `npm run seed` against your Atlas database.
