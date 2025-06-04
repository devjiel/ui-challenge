import { prisma } from "@/lib/prisma";

export async function getPageSessions() {
  const pageSessions = await prisma.pageSession.findMany();
  return pageSessions;
}

export async function getPageSessionsCount() {
  const pageSessions = await prisma.pageSession.count();
  return pageSessions;
}

export async function getSessionDurationAverage() {
  const pageSessions = await prisma.pageSession.aggregate({
    _avg: {
      duration: true,
    },
  });
  return pageSessions._avg.duration;
}