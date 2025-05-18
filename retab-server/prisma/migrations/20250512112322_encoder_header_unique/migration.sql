/*
  Warnings:

  - A unique constraint covering the columns `[headerTagId,userId]` on the table `EncoderHeader` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `EncoderHeader_headerTagId_userId_key` ON `EncoderHeader`(`headerTagId`, `userId`);
