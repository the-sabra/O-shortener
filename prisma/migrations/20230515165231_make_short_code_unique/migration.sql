/*
  Warnings:

  - A unique constraint covering the columns `[short_code]` on the table `Urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Urls_short_code_key` ON `Urls`(`short_code`);
