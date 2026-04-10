-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "walletAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TokenTransfer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenId" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "transferredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memo" TEXT,
    CONSTRAINT "TokenTransfer_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TokenTransfer_fromAddress_fkey" FOREIGN KEY ("fromAddress") REFERENCES "User" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TokenTransfer_toAddress_fkey" FOREIGN KEY ("toAddress") REFERENCES "User" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlantingLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "climateTags" TEXT NOT NULL,
    "permitNotes" TEXT NOT NULL,
    "sources" TEXT NOT NULL,
    "ecoregion" TEXT NOT NULL DEFAULT '',
    "referenceLat" REAL,
    "referenceLng" REAL
);
INSERT INTO "new_PlantingLocation" ("climateTags", "id", "name", "permitNotes", "region", "sources") SELECT "climateTags", "id", "name", "permitNotes", "region", "sources" FROM "PlantingLocation";
DROP TABLE "PlantingLocation";
ALTER TABLE "new_PlantingLocation" RENAME TO "PlantingLocation";
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seed" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "reportUrl" TEXT,
    "reportHash" TEXT,
    "rarityTier" TEXT NOT NULL DEFAULT 'Utility',
    "proofHash" TEXT,
    "ownerWallet" TEXT,
    CONSTRAINT "Token_ownerWallet_fkey" FOREIGN KEY ("ownerWallet") REFERENCES "User" ("walletAddress") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("createdAt", "id", "reportHash", "reportUrl", "seed", "summary", "title", "version") SELECT "createdAt", "id", "reportHash", "reportUrl", "seed", "summary", "title", "version" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");
