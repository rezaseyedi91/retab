-- DropForeignKey
ALTER TABLE `EncoderHeader` DROP FOREIGN KEY `EncoderHeader_headerTagId_fkey`;

-- AddForeignKey
ALTER TABLE `EncoderHeader` ADD CONSTRAINT `EncoderHeader_headerTagId_fkey` FOREIGN KEY (`headerTagId`) REFERENCES `MeiTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
