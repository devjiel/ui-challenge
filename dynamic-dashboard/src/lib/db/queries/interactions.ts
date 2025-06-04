import { prisma } from "@/lib/prisma";

export async function getInteractions() {
  const interactions = await prisma.interactions.findMany();
  return interactions;
}

export async function getInteractionsCount() {
  const interactions = await prisma.interactions.count();
  return interactions;
}