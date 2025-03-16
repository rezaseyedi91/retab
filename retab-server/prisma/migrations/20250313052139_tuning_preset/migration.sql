/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `TuningPreset` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `TuningPreset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `TuningPreset` MODIFY `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TuningPreset_title_key` ON `TuningPreset`(`title`);
