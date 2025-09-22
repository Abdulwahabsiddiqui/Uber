# Users & Captains API

This document describes the user and captain endpoints implemented under `/users` and `/captains`.

---

## Common Notes
- Ensure `.env` contains `MONGO_URI` and `SECRET_KEY`.
- Use header `Content-Type: application/json` for JSON requests.
- Protected endpoints require a valid JWT in `Authorization: Bearer <token>` or the httpOnly cookie `token`.
- Cookies set by the server are httpOnly, sameSite lax, secure in production.
- Validation errors return 400 with an `errors` array from express-validator.

---

## Users

### POST /users/register
- Description: Create a new user.
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Boss",
  "email": "khanzada@gmail.com",
  "password": "munaliza123"
}
```
- Success: 201 Created
  - Body: `{ "user": { "id", "name", "email" }, "token": "<jwt>" }`
  - Server also sets `token` cookie.
- Errors: 400 validation, 409 duplicate email, 500 server error

### POST /users/login
- Description: Authenticate user and receive token.
- Body:
```json
{
  "email": "khanzada@gmail.com",
  "password": "munaliza123"
}
```
- Success: 200 OK — `{ "user": { ... }, "token": "<jwt>" }` and cookie set.
- Errors: 400 validation, 401 invalid credentials

### POST /users/logout
- Description: Blacklist current token and clear cookie. Protected.
- Method: POST
- Success: 200 OK — `{ "message": "Logged out" }`
- Errors: 400 no token, 401 unauthorized

### GET /users/profile
- Description: Get authenticated user's profile. Protected.
- Success: 200 OK — `{ "user": { ... } }`

---

## Captains

### POST /captains/register
- Description: Register a new captain (same flow as users).
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Captain Name",
  "email": "captain@example.com",
  "password": "strongpassword"
}
```
- Success: 201 Created
  - Body: `{ "captain": { "id", "name", "email" }, "token": "<jwt>" }`
  - Server sets `token` cookie.
- Errors: 400 validation, 409 duplicate email, 500 server error

### POST /captains/login
- Description: Authenticate captain and receive token.
- Body:
```json
{
  "email": "captain@example.com",
  "password": "strongpassword"
}
```
- Success: 200 OK — `{ "captain": { ... }, "token": "<jwt>" }` and cookie set.
- Errors: 400 validation, 401 invalid credentials

### POST /captains/logout
- Description: Blacklist current captain token and clear cookie. Protected.
- Method: POST
- Success: 200 OK — `{ "message": "Logged out" }`
- Errors: 400 no token, 401 unauthorized

### GET /captains/profile
- Description: Get authenticated captain profile. Protected.
- Success: 200 OK — `{ "captain": { ... } }`

---

## Examples

- curl register (user):
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Boss","email":"khanzada@gmail.com","password":"munaliza123"}'
```

- curl login (captain):
```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"captain@example.com","password":"strongpassword"}'
```

- curl profile with header:
```bash
curl -H "Authorization: Bearer <token>" http://localhost:4000/captains/profile
```

---

If you change token behavior (cookie vs header) ensure client uses `credentials: 'include'` when relying on cookies.