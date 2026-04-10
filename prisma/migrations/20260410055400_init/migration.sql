-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "archiveUrl" TEXT,
    "youtubeUrl" TEXT,
    "genreTags" TEXT NOT NULL,
    "durationSec" INTEGER,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "archiveUrl" TEXT,
    "youtubeUrl" TEXT,
    "runtimeMin" INTEGER,
    "rating" TEXT,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "hardinessZones" TEXT NOT NULL,
    "nativeRegions" TEXT NOT NULL,
    "careNotes" TEXT NOT NULL,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlantingLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "climateTags" TEXT NOT NULL,
    "permitNotes" TEXT NOT NULL,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TreatIdea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "originCountry" TEXT NOT NULL,
    "seasonality" TEXT NOT NULL,
    "whereToBuyNotes" TEXT NOT NULL,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GreekGod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "storyTitle" TEXT NOT NULL,
    "storyText" TEXT NOT NULL,
    "primarySources" TEXT NOT NULL,
    "secondarySources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "issuerCountry" TEXT NOT NULL,
    "denomination" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mint" TEXT,
    "mintage" TEXT,
    "composition" TEXT NOT NULL,
    "diameterMm" REAL,
    "coinTypeTags" TEXT NOT NULL,
    "historyText" TEXT NOT NULL,
    "collectorNotes" TEXT NOT NULL,
    "whereToFindLinks" TEXT NOT NULL,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "speaker" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "sourceUrl" TEXT
);

-- CreateTable
CREATE TABLE "Gemstone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mohs" REAL NOT NULL,
    "colors" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "whereFoundRegions" TEXT NOT NULL,
    "ethicalCollectingNotes" TEXT NOT NULL,
    "whereToBuyNotes" TEXT NOT NULL,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mealName" TEXT NOT NULL,
    "cuisineRegion" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "recipeText" TEXT NOT NULL,
    "historyNotes" TEXT NOT NULL,
    "variants" TEXT NOT NULL,
    "sources" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seed" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "reportUrl" TEXT,
    "reportHash" TEXT
);

-- CreateTable
CREATE TABLE "TokenItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "notes" TEXT,
    CONSTRAINT "TokenItem_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Citation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenId" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "sourceTitle" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "retrievedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "snippet" TEXT,
    CONSTRAINT "Citation_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
