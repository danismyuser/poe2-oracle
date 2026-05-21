-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "ilvl" INTEGER NOT NULL,
    "affixes" JSONB NOT NULL,
    "budget" TEXT NOT NULL,
    "question" TEXT,
    "response" TEXT NOT NULL,
    "routeChosen" TEXT,
    "costEstimate" TEXT,
    "patchVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedCraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "craftId" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "currencySpent" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CraftAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatchCache" (
    "version" TEXT NOT NULL,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modPools" JSONB NOT NULL,
    "notes" TEXT,

    CONSTRAINT "PatchCache_pkey" PRIMARY KEY ("version")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "SavedCraft_userId_createdAt_idx" ON "SavedCraft"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "CraftAttempt_craftId_idx" ON "CraftAttempt"("craftId");

-- AddForeignKey
ALTER TABLE "SavedCraft" ADD CONSTRAINT "SavedCraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftAttempt" ADD CONSTRAINT "CraftAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftAttempt" ADD CONSTRAINT "CraftAttempt_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "SavedCraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
