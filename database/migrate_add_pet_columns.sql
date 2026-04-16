-- Run this if you already have the pets table from the old schema.
-- It adds the missing columns needed for the Featured Furry Friends section.

ALTER TABLE pets
  ADD COLUMN IF NOT EXISTS species VARCHAR(50) DEFAULT 'Dog' AFTER name,
  ADD COLUMN IF NOT EXISTS tags VARCHAR(255) DEFAULT NULL AFTER description,
  ADD COLUMN IF NOT EXISTS status ENUM('Available', 'Adopted', 'Pending') DEFAULT 'Available' AFTER image;
