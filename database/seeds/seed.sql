-- Seeds para ECOBOL - Datos de prueba

-- Estados del sistema (orden del flujo postal)
INSERT INTO estados (nombre, descripcion, orden) VALUES
('Registrado', 'El paquete fue ingresado al sistema', 1),
('En tránsito', 'El paquete está en camino a su destino', 2),
('En sucursal de destino', 'El paquete llegó a la sucursal de destino', 3),
('Entregado', 'El paquete fue entregado al destinatario', 4);

-- 9 sucursales (una por departamento de Bolivia)
INSERT INTO sucursales (nombre, ciudad, direccion, telefono) VALUES
('Sucursal La Paz Central', 'La Paz', 'Av. Mariscal Santa Cruz N° 1234', '2-2441234'),
('Sucursal Cochabamba', 'Cochabamba', 'Av. Heroínas N° 456, Plaza 14 de Septiembre', '4-4251234'),
('Sucursal Santa Cruz', 'Santa Cruz de la Sierra', 'Av. Cañoto N° 789, Casco Viejo', '3-3341234'),
('Sucursal Oruro', 'Oruro', 'Calle Bolívar N° 321', '2-5251234'),
('Sucursal Potosí', 'Potosí', 'Av. Serrudo N° 654', '2-6221234'),
('Sucursal Tarija', 'Tarija', 'Calle Sucre N° 987', '4-6631234'),
('Sucursal Sucre', 'Sucre', 'Av. Hernando Siles N° 159', '4-6451234'),
('Sucursal Trinidad', 'Trinidad', 'Calle 18 de Noviembre N° 753', '3-4621234'),
('Sucursal Cobija', 'Cobija', 'Av. 9 de Febrero N° 246', '3-8421234');

-- Usuarios: 1 admin + 2 empleados
-- Contraseña para todos: Admin123! (hash bcrypt generado)
-- Para regenerar: node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('Admin123!',10))"
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Administrador ECOBOL', 'admin@ecobol.bo', '$2a$10$N0jV/9BsWyY5kSv9EBTR1Oc53ROoZppk8hpzyBAKYkNBbw5GHZWGG', 'admin'),
('Carlos Mamani', 'carlos.mamani@ecobol.bo', '$2a$10$N0jV/9BsWyY5kSv9EBTR1Oc53ROoZppk8hpzyBAKYkNBbw5GHZWGG', 'empleado'),
('Ana Quispe', 'ana.quispe@ecobol.bo', '$2a$10$N0jV/9BsWyY5kSv9EBTR1Oc53ROoZppk8hpzyBAKYkNBbw5GHZWGG', 'empleado');

-- 10 envíos de prueba con distintos estados
INSERT INTO envios (codigo_rastreo, remitente_nombre, remitente_telefono, remitente_direccion, destinatario_nombre, destinatario_telefono, destinatario_direccion, peso, tipo_servicio, id_sucursal_origen, id_sucursal_destino, id_estado, fecha_registro, fecha_estimada_entrega, id_usuario_registro) VALUES
('ECO-20260501-00001', 'Juan Pérez López', '71234567', 'Calle Murillo 123, La Paz', 'María García Flores', '69876543', 'Av. Blanco Galindo 456, Cochabamba', 2.50, 'normal', 1, 2, 4, '2026-05-01 09:00:00', '2026-05-05', 2),
('ECO-20260502-00002', 'Roberto Silva', '76543210', 'Av. Bush 789, Santa Cruz', 'Patricia Condori', '65432109', 'Calle Potosí 321, Oruro', 0.75, 'express', 3, 4, 3, '2026-05-02 10:30:00', '2026-05-04', 2),
('ECO-20260503-00003', 'Empresa ABC S.A.', '22345678', 'Zona Sopocachi, La Paz', 'Luis Vargas', '74567890', 'Calle Junín 654, Sucre', 5.00, 'certificado', 1, 7, 2, '2026-05-03 11:00:00', '2026-05-08', 3),
('ECO-20260503-00004', 'Sandra Torres', '67891234', 'Av. América 159, Cochabamba', 'Fernando Rojas', '72345678', 'Av. Potosí 753, Tarija', 1.20, 'normal', 2, 6, 1, '2026-05-03 14:00:00', '2026-05-09', 3),
('ECO-20260504-00005', 'Marcos Chávez', '73456789', 'Calle Colón 246, Potosí', 'Gloria Mamani', '68901234', 'Av. Gauyaramerin 987, Trinidad', 3.80, 'express', 5, 8, 2, '2026-05-04 08:30:00', '2026-05-06', 2),
('ECO-20260504-00006', 'Elena Vega', '79012345', 'Zona Equipetrol, Santa Cruz', 'Oscar Flores', '62345678', 'Av. Internacional 135, Cobija', 0.50, 'certificado', 3, 9, 1, '2026-05-04 16:00:00', '2026-05-10', 2),
('ECO-20260505-00007', 'Daniel Morales', '75678901', 'Calle Murguía 468, Sucre', 'Cecilia Ramos', '71890234', 'Av. Ejercito 642, Oruro', 2.10, 'normal', 7, 4, 3, '2026-05-05 09:30:00', '2026-05-09', 3),
('ECO-20260505-00008', 'Ministerio de Educación', '22891234', 'Plaza Murillo, La Paz', 'Dirección Distrital Tarija', '46631111', 'Av. Las Américas, Tarija', 8.50, 'certificado', 1, 6, 4, '2026-05-05 12:00:00', '2026-05-07', 2),
('ECO-20260506-00009', 'Pedro Quispe', '74321098', 'Calle Bustillo 789, Potosí', 'Juana Choque', '77654321', 'Zona Norte, La Paz', 1.90, 'normal', 5, 1, 1, '2026-05-06 10:00:00', '2026-05-12', 3),
('ECO-20260506-00010', 'Claudia Méndez', '76012345', 'Av. Melchor Pinto, Trinidad', 'Arturo López', '73210987', 'Av. Libertad, Santa Cruz', 0.30, 'express', 8, 3, 2, '2026-05-06 15:30:00', '2026-05-08', 2);

-- Historial de estados para los envíos
INSERT INTO historial_estados (id_envio, id_estado, id_usuario, fecha_hora, observacion) VALUES
-- Envío 1 (Entregado)
(1, 1, 2, '2026-05-01 09:00:00', 'Paquete registrado en sistema'),
(1, 2, 2, '2026-05-02 08:00:00', 'Paquete despachado desde La Paz'),
(1, 3, 3, '2026-05-04 14:00:00', 'Paquete recibido en sucursal Cochabamba'),
(1, 4, 3, '2026-05-05 10:00:00', 'Paquete entregado al destinatario'),
-- Envío 2 (En sucursal de destino)
(2, 1, 2, '2026-05-02 10:30:00', 'Paquete registrado en sistema'),
(2, 2, 2, '2026-05-02 16:00:00', 'Paquete express despachado'),
(2, 3, 3, '2026-05-03 09:00:00', 'Llegó a Oruro. Pendiente de entrega'),
-- Envío 3 (En tránsito)
(3, 1, 3, '2026-05-03 11:00:00', 'Documento certificado registrado'),
(3, 2, 3, '2026-05-04 07:00:00', 'En ruta La Paz - Sucre'),
-- Envío 4 (Registrado)
(4, 1, 3, '2026-05-03 14:00:00', 'Paquete ingresado al sistema'),
-- Envío 5 (En tránsito)
(5, 1, 2, '2026-05-04 08:30:00', 'Paquete registrado'),
(5, 2, 2, '2026-05-04 18:00:00', 'Despachado desde Potosí vía Santa Cruz'),
-- Envío 6 (Registrado)
(6, 1, 2, '2026-05-04 16:00:00', 'Sobre certificado registrado'),
-- Envío 7 (En sucursal de destino)
(7, 1, 3, '2026-05-05 09:30:00', 'Paquete registrado en Sucre'),
(7, 2, 3, '2026-05-06 07:00:00', 'En ruta a Oruro'),
(7, 3, 2, '2026-05-07 11:00:00', 'Disponible para retiro en Oruro'),
-- Envío 8 (Entregado)
(8, 1, 2, '2026-05-05 12:00:00', 'Documentos ministeriales registrados'),
(8, 2, 2, '2026-05-05 18:00:00', 'Despachado con carácter urgente'),
(8, 3, 3, '2026-05-06 14:00:00', 'Recibido en Tarija'),
(8, 4, 3, '2026-05-07 09:00:00', 'Entregado al director distrital'),
-- Envío 9 (Registrado)
(9, 1, 3, '2026-05-06 10:00:00', 'Paquete registrado en Potosí'),
-- Envío 10 (En tránsito)
(10, 1, 2, '2026-05-06 15:30:00', 'Sobre registrado en Trinidad'),
(10, 2, 2, '2026-05-06 20:00:00', 'Despachado vía aéreo a Santa Cruz');
