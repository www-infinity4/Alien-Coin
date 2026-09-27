CREATE TABLE "InterestSignal" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "walletAddress" TEXT NOT NULL,
  "namespace" TEXT NOT NULL,
  "term" TEXT NOT NULL,
  "affinity" REAL NOT NULL DEFAULT 1,
  "sourceSystem" TEXT NOT NULL,
  "sourceEventId" TEXT NOT NULL,
  "evidence" TEXT,
  "firstSeenAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSeenAt" DATETIME NOT NULL,
  CONSTRAINT "InterestSignal_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "User" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "FeedInteraction" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "walletAddress" TEXT NOT NULL,
  "tokenId" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "weight" REAL NOT NULL DEFAULT 1,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FeedInteraction_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "User" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "InterestSignal_walletAddress_sourceSystem_sourceEventId_term_key" ON "InterestSignal"("walletAddress", "sourceSystem", "sourceEventId", "term");
CREATE INDEX "InterestSignal_walletAddress_affinity_idx" ON "InterestSignal"("walletAddress", "affinity");
CREATE INDEX "FeedInteraction_walletAddress_createdAt_idx" ON "FeedInteraction"("walletAddress", "createdAt");
CREATE INDEX "FeedInteraction_tokenId_createdAt_idx" ON "FeedInteraction"("tokenId", "createdAt");
