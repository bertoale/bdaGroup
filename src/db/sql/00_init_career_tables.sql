-- ============================================================================
-- MASTER SCRIPT: Inisialisasi Seluruh Tabel Career Database MySQL
-- Database: bdaGroup
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel Lowongan Pekerjaan
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

-- 2. Tabel Pelamar Kerja
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

SET FOREIGN_KEY_CHECKS = 1;
