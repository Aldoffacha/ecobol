-- ECOBOL - Sistema de Gestión de Envíos Postales
-- Schema de Base de Datos

-- Tabla de estados del paquete
CREATE TABLE estados (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    orden INTEGER NOT NULL
);

-- Tabla de sucursales
CREATE TABLE sucursales (
    id_sucursal SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20)
);

-- Tabla de usuarios (empleados y administradores)
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'empleado')),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla principal de envíos
CREATE TABLE envios (
    id_envio SERIAL PRIMARY KEY,
    codigo_rastreo VARCHAR(20) NOT NULL UNIQUE,
    -- Remitente
    remitente_nombre VARCHAR(100) NOT NULL,
    remitente_telefono VARCHAR(20),
    remitente_direccion TEXT,
    -- Destinatario
    destinatario_nombre VARCHAR(100) NOT NULL,
    destinatario_telefono VARCHAR(20),
    destinatario_direccion TEXT,
    -- Detalle del envío
    peso DECIMAL(8,2) NOT NULL CHECK (peso > 0),
    tipo_servicio VARCHAR(50) NOT NULL CHECK (tipo_servicio IN ('normal', 'express', 'certificado')),
    descripcion TEXT,
    -- Sucursales
    id_sucursal_origen INTEGER NOT NULL REFERENCES sucursales(id_sucursal),
    id_sucursal_destino INTEGER NOT NULL REFERENCES sucursales(id_sucursal),
    -- Estado y fechas
    id_estado INTEGER NOT NULL REFERENCES estados(id_estado),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_estimada_entrega DATE,
    fecha_entrega_real TIMESTAMP,
    -- Auditoría
    id_usuario_registro INTEGER REFERENCES usuarios(id_usuario)
);

-- Historial de cambios de estado
CREATE TABLE historial_estados (
    id_historial SERIAL PRIMARY KEY,
    id_envio INTEGER NOT NULL REFERENCES envios(id_envio) ON DELETE CASCADE,
    id_estado INTEGER NOT NULL REFERENCES estados(id_estado),
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacion TEXT
);

-- Índices para performance
CREATE INDEX idx_envios_codigo ON envios(codigo_rastreo);
CREATE INDEX idx_envios_estado ON envios(id_estado);
CREATE INDEX idx_envios_sucursal_origen ON envios(id_sucursal_origen);
CREATE INDEX idx_envios_sucursal_destino ON envios(id_sucursal_destino);
CREATE INDEX idx_historial_envio ON historial_estados(id_envio);
