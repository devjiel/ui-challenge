import { prisma } from "@/lib/prisma";

export async function createInteraction(elementId: string, elementType: string, interaction: string, time: Date) {
  const value = await prisma.interaction.create({
    data: { elementId, elementType, interaction, time },
  });
  return value;
}