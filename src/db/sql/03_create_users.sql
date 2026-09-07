-- ============================================================================
-- TABEL: users
-- Deskripsi: Menyimpan akun login admin untuk CMS Best Deals Asia Group
-- Kompatibilitas: Struktur identik dengan users di solusi-berdigital
-- ============================================================================

CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(128) NOT NULL,
  `name` VARCHAR(255) NOT NULL DEFAULT 'Admin',
  `email` VARCHAR(255) NOT NULL,
  `password` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
