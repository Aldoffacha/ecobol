# ECOBOL Backend

API REST construida con Node.js + Express + PostgreSQL.

## Instalación

```bash
npm install
cp .env.example .env
# Editar .env con credenciales de PostgreSQL
npm run dev
```

## Endpoints

| Método | Ruta | Acceso |
|---|---|---|
| POST | /api/auth/login | Público |
| GET | /api/auth/me | Auth |
| GET | /api/envios/rastrear/:codigo | Público |
| GET | /api/envios | Auth |
| POST | /api/envios | Auth |
| GET | /api/envios/:id | Auth |
| PUT | /api/envios/:id/estado | Auth |
| GET | /api/envios/:id/historial | Auth |
| GET | /api/sucursales | Auth |
| POST | /api/sucursales | Admin |
| GET | /api/usuarios | Admin |
| POST | /api/usuarios | Admin |
| GET | /api/dashboard | Auth |
| GET | /api/reportes | Auth |
| GET | /api/estados | Auth |

## Variables de entorno requeridas

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecobol_db
DB_USER=postgres
DB_PASSWORD=...
JWT_SECRET=...
JWT_EXPIRES_IN=8h
```
