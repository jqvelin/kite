-- CreateTable
CREATE TABLE "_OnlineChatMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OnlineChatMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OnlineChatMembers_B_index" ON "_OnlineChatMembers"("B");

-- AddForeignKey
ALTER TABLE "_OnlineChatMembers" ADD CONSTRAINT "_OnlineChatMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnlineChatMembers" ADD CONSTRAINT "_OnlineChatMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
