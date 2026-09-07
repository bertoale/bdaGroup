-- ============================================================================
-- TABEL: grp_job_applications
-- Deskripsi: Menyimpan data pelamar dan CV lamaran kerja masuk
-- Kompatibilitas: Struktur identik dengan hpt_job_applications di Hospitality
-- ============================================================================

CREATE TABLE IF NOT EXISTS `grp_job_applications` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_position_id` BIGINT UNSIGNED NULL,
  `job_title` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `cv_path` VARCHAR(500) NULL,
  `status` ENUM('new', 'reviewed', 'accepted', 'rejected') NOT NULL DEFAULT 'new',
  `admin_notes` TEXT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_grp_job_applications_position` (`job_position_id`),
  KEY `idx_grp_job_applications_status` (`status`, `is_deleted`),
  CONSTRAINT `fk_grp_job_applications_position` 
    FOREIGN KEY (`job_position_id`) 
    REFERENCES `grp_job_positions` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
