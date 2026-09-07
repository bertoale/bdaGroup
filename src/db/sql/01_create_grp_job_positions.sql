-- ============================================================================
-- TABEL: grp_job_positions
-- Deskripsi: Menyimpan daftar posisi lowongan pekerjaan untuk Best Deals Asia Group
-- Kompatibilitas: Struktur identik dengan hpt_job_positions di Hospitality
-- ============================================================================

CREATE TABLE IF NOT EXISTS `grp_job_positions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('active', 'closed') NOT NULL DEFAULT 'active',
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_grp_job_positions_status` (`status`, `is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
