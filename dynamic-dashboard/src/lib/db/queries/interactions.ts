import { prisma } from "@/lib/prisma";
import { Interaction } from "@/lib/prisma";

export async function getInteractions() : Promise<Interaction[]> {
  const interactions = await prisma.interaction.findMany();
  return interactions;
}

export async function getInteractionsCount() {
  const interactions = await prisma.interaction.count();
  return interactions;
}