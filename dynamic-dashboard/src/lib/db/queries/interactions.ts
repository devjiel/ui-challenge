import { prisma } from "@/lib/prisma";

export async function getInteractions() {
  const interactions = await prisma.interactions.findMany();
  return interactions;
}