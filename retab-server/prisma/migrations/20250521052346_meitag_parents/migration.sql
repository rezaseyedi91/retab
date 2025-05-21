-- DropForeignKey
ALTER TABLE `MeiTag` DROP FOREIGN KEY `MeiTag_parentId_fkey`;

-- DropIndex
DROP INDEX `MeiTag_parentId_fkey` ON `MeiTag`;

-- CreateTable
CREATE TABLE `_MeiTagChildParent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MeiTagChildParent_AB_unique`(`A`, `B`),
    INDEX `_MeiTagChildParent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MeiTagChildParent` ADD CONSTRAINT `_MeiTagChildParent_A_fkey` FOREIGN KEY (`A`) REFERENCES `MeiTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeiTagChildParent` ADD CONSTRAINT `_MeiTagChildParent_B_fkey` FOREIGN KEY (`B`) REFERENCES `MeiTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
