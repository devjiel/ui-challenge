import { prisma } from "@/lib/prisma";
import { Session } from "@/lib/prisma";

export async function getSessions() : Promise<Session[]> {
  const sessions = await prisma.session.findMany();
  return sessions;
}

export async function getSessionsCount() {
  const sessions = await prisma.session.count();
  return sessions;
}