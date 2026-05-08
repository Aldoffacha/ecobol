# ECOBOL - Sistema de Gestión de Envíos Postales

Sistema funcional para la Empresa de Correos de Bolivia (ECOBOL). Permite registrar envíos, rastrear paquetes y gestionar el flujo postal entre 9 sucursales del país.

## Stack tecnológico

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Base de datos:** PostgreSQL

## Estructura del proyecto

```
ecobol/
├── backend/     API REST (14 endpoints)
├── frontend/    React SPA (8 pantallas)
├── database/    Schema SQL + Seeds
└── docs/        UML, arquitectura, manuales
```

## Instalación con Docker (recomendado)

Un solo comando levanta todo (BD + backend + frontend):

```bash
docker compose up --build
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001 |
| PostgreSQL | localhost:5432 |

La base de datos se inicializa automáticamente con el schema y los datos de prueba.

## Instalación manual (sin Docker)

1. Crear la base de datos PostgreSQL (ver `database/schema.sql`)
2. Configurar `backend/.env` (copiar desde `.env.example`)
3. Instalar dependencias e iniciar:

```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## Credenciales de prueba

| Usuario | Email | Contraseña | Rol |
|---|---|---|---|
| Administrador | admin@ecobol.bo | Admin123! | admin |
| Carlos Mamani | carlos.mamani@ecobol.bo | Admin123! | empleado |
| Ana Quispe | ana.quispe@ecobol.bo | Admin123! | empleado |

## Funcionalidades

- Registro digital de envíos con código de rastreo único (ECO-YYYYMMDD-NNNNN)
- Portal público de rastreo sin login requerido
- Actualización de estados: Registrado → En tránsito → En sucursal de destino → Entregado
- Dashboard gerencial con gráficos (recharts)
- Exportación de reportes en CSV
- Autenticación JWT con roles: admin y empleado
