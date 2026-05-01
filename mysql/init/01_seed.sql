-- =============================================================
-- Seed inicial: usuarios por defecto con roles
-- Contraseñas hasheadas con SHA256 (mismo algoritmo del backend)
--   admin@neox.com      -> Admin@2024!
--   supervisor@neox.com -> Super@2024!
--   user@neox.com       -> User@2024!
-- =============================================================

USE db_crud;

INSERT INTO `user` (email, username, names, lastName, password, role, active)
VALUES
  (
    'admin@neox.com',
    'admin_neox',
    'Administrador',
    'Sistema',
    '2f215b2ab49a5a6161c1b247ee5dc86733d76a62fc83dd437e70e3a564cbfed9',
    'admin',
    1
  ),
  (
    'supervisor@neox.com',
    'supervisor_neox',
    'Supervisor',
    'Sistema',
    '2760602636b820dd3cfdbeba47c5689a64c7d4b4f99d3cd5d256b0826ebf61b6',
    'supervisor',
    1
  ),
  (
    'user@neox.com',
    'user_neox',
    'Usuario',
    'Sistema',
    '16a1b497f8734da82af1fdec136e23ba9ed865b87150b69c40fb30056fe40911',
    'user',
    1
  )
ON DUPLICATE KEY UPDATE email = email;
