# ECOBOL Frontend

SPA construida con React + Vite.

## Instalación

```bash
npm install
npm run dev
# Abre http://localhost:5173
```

## Pantallas

| Ruta | Pantalla | Acceso |
|---|---|---|
| /login | Inicio de sesión | Público |
| /rastrear | Rastreo público de paquetes | Público |
| /dashboard | Dashboard gerencial con gráficos | Auth |
| /envios | Lista de envíos con filtros | Auth |
| /envios/nuevo | Formulario de nuevo envío | Auth |
| /envios/:id | Detalle + historial + cambio de estado | Auth |
| /sucursales | Gestión de sucursales | Admin |
| /usuarios | Gestión de usuarios | Admin |

## Configuración

El proxy de Vite redirige `/api` al backend en `localhost:3001` automáticamente.
Para producción, configurar `VITE_API_URL` en `.env`.
