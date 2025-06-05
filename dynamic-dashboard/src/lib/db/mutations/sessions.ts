import { prisma } from "@/lib/prisma";

export async function createSession(sessionId: string, userId: string, startedAt: Date, duration: string) {
  const session = await prisma.session.create({
    data: { sessionId, userId, startedAt, duration },
  });
  return session;
}