# Deployment — Vercel + Railway + Auth0 + MongoDB

Production topology:

- **Frontend (React):** Vercel — serves static build from `client/dist`
- **API (Express):** Railway — runs `server/dist/index.js`
- **Database:** MongoDB Atlas
- **Admin auth:** Auth0

---

## 1. MongoDB Atlas

Use the same cluster for production with a dedicated database name (`terriblegeralds`). Restrict network access to Railway egress IPs when possible.

Connection string → Railway env `MONGODB_URI`.

---

## 2. Railway (API)

1. Create a new project from GitHub repo `misterlinderman/terriblegeralds`
2. Keep root directory at repository root (uses `Dockerfile` + `railway.toml`)
3. Railway builds the API via Docker — installs `server/` dependencies before `tsc`. Do not point Railway at `client/`
4. If the Railway dashboard has a custom **Build Command** override (e.g. `npm run build:server`), **clear it** so `railway.toml` / `Dockerfile` are used
5. Environment variables:

| Variable | Example |
|----------|---------|
| `PORT` | `3001` (Railway may inject `PORT` automatically) |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Atlas connection string |
| `AUTH0_DOMAIN` | `your-tenant.auth0.com` |
| `AUTH0_AUDIENCE` | `https://api.terriblegeralds.com/api` |
| `ADMIN_EMAILS` | `owner@example.com` |
| `CLIENT_URL` | `https://terriblegeralds.vercel.app` |

4. Deploy and note the public URL, e.g. `https://terriblegeralds-production.up.railway.app`

5. Run seed once (Railway shell or local with production URI):

```bash
npm run seed
```

---

## 3. Auth0 (production)

Update **Callback / Logout / Web Origins** with your Vercel URL.

Update API **Identifier** to match production `AUTH0_AUDIENCE` (e.g. `https://YOUR-RAILWAY-URL/api` or custom domain).

Update client env:

```
VITE_AUTH0_AUDIENCE=https://YOUR-RAILWAY-URL/api
```

---

## 4. Vercel (frontend)

1. Import GitHub repo
2. **Root Directory:** `client`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. Environment variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://YOUR-RAILWAY-URL/api` |
| `VITE_AUTH0_DOMAIN` | Auth0 domain |
| `VITE_AUTH0_CLIENT_ID` | SPA client ID |
| `VITE_AUTH0_AUDIENCE` | Same as Railway `AUTH0_AUDIENCE` |

6. `vercel.json` at repo root handles SPA rewrites when Vercel project uses monorepo config; if Vercel root is `client/`, add equivalent rewrites in `client/vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 5. Post-deploy checklist

- [ ] `GET https://RAILWAY-URL/api/health` returns OK
- [ ] Public site loads menu and FAQs (run seed if empty)
- [ ] Contact form submits successfully
- [ ] `/admin/login` → Auth0 → dashboard loads
- [ ] Admin CRUD persists to MongoDB
- [ ] CORS: no browser errors when client calls API

---

## Custom domains (optional)

| Service | Suggested |
|---------|-----------|
| Vercel | `www.terriblegeralds.com` |
| Railway | `api.terriblegeralds.com` |

Update Auth0 URLs, `CLIENT_URL`, and `VITE_API_URL` accordingly.

---

## CI (future)

Recommended GitHub Actions workflow:

1. `npm run install:all`
2. `npm run lint`
3. `npm run build`

Vercel and Railway can auto-deploy on push to `main`.
