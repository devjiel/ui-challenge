import { prisma } from "@/lib/prisma";

export async function getSessions() {
  const pageSessions = await prisma.pageSession.findMany();
  return pageSessions;
}

export async function getPageSessionsCount() {
  const pageSessions = await prisma.pageSession.count();
  return pageSessions;
}