/*
  Warnings:

  - You are about to drop the column `CreaetAt` on the `Urls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Urls` DROP COLUMN `CreaetAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
