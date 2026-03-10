/*
  Warnings:
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
*/

CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

CREATE TEMPORARY TABLE unique_categories AS 
SELECT DISTINCT category as name FROM "Product";

INSERT INTO "Category" ("name", "updatedAt")
SELECT name, datetime('now') FROM unique_categories;

ALTER TABLE "Product" ADD COLUMN "categoryId" INTEGER;

UPDATE "Product" 
SET "categoryId" = (
    SELECT "id" FROM "Category" 
    WHERE "Category"."name" = "Product"."category"
);

PRAGMA foreign_keys=off;

CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Product" (
    "id", "name", "price", "description", "image", 
    "categoryId", "createdAt", "updatedAt"
)
SELECT 
    "id", "name", "price", "description", "image",
    "categoryId", "createdAt", "updatedAt"
FROM "Product";

DROP TABLE "Product";

ALTER TABLE "new_Product" RENAME TO "Product";

CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

PRAGMA foreign_keys=on;

DROP TABLE unique_categories;