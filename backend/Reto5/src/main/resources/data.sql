-- Usuarios
-- Las contraseñas están encriptadas en BCrypt para:
-- "empresa", "admin" y "cliente" respectivamente.
-- (Estas son contraseñas de ejemplo. Reemplaza los hash por los generados en tu entorno)
-- ============================================
INSERT INTO usuarios (email, nombre, apellidos, password, enabled, fecha_Registro, rol) VALUES
  ('empresa', 'empresa', 'empresa', '$2a$10$TrxEN6FHyIPmznxsMIZHEOsBR2ECsFwEyTh93PQ.ip4rwIfb0TpMW', 1, CURDATE(), 'EMPRESA'),
  ('admin', 'admin', 'admin', '$2a$10$hQRCwKaP5lL.aKePMS/xJuoVmvy6ygJ1TR69NhwQJARKYMMuJ7dY2', 1, CURDATE(), 'ADMON'),
  ('cliente', 'cliente', 'cliente', '$2a$10$b2dksye.MR/qBNFUcxQneuIL2eUBoRAwwOTxU3zxenWKqZcOiETLS', 1, CURDATE(), 'CLIENTE');

-- ============================================
-- Categorías
-- ============================================
INSERT INTO categorias (nombre, descripcion) VALUES
  ('Tecnología', 'Vacantes de desarrollo y sistemas'),
  ('Administración', 'Vacantes en el área administrativa');

-- ============================================
-- Empresas
-- Nota: La columna email debe existir en Usuarios. Usamos el usuario con rol EMPRESA.
-- ============================================
INSERT INTO empresas (cif, nombre_empresa, direccion_fiscal, pais, email) VALUES
  ('A12345678', 'Empresa Tech', 'Calle Falsa 123', 'España', 'empresa');

-- ============================================
-- Vacantes
-- Se relaciona una vacante con una categoría y la empresa creada
-- ============================================
INSERT INTO vacantes (nombre, descripcion, fecha, salario, estatus, destacado, imagen, detalles, id_Categoria, id_empresa) VALUES
  ('Desarrollador Java', 'Vacante para desarrollador Java en proyectos de tecnología', '2025-03-24', 30000, 'CREADA', 1, 'imagen_desarrollador.jpg', 'Se requiere experiencia en Spring Boot y Java', 1, 1);

-- ============================================
-- Solicitudes
-- Se crea una solicitud de la vacante para el usuario CLIENTE
-- ============================================
INSERT INTO solicitudes (fecha, archivo, comentarios, estado, curriculum, id_Vacante, email) VALUES
  ('2025-03-24', 'cv_cliente.pdf', 'Muy interesado en la vacante', 0, 'curriculum_cliente.pdf', 1, 'cliente');
