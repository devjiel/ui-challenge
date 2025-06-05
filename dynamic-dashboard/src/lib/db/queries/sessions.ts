import { prisma } from "@/lib/prisma";
import { Session } from "@/lib/prisma";

export async function getSessions() : Promise<Session[]> {
  const sessions = await prisma.session.findMany();
  return sessions;
}

export async function getPageSessionsCount() {
  const pageSessions = await prisma.session.count();
  return pageSessions;
}