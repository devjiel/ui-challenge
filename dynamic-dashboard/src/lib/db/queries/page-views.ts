import { prisma } from "@/lib/prisma";
import { PageView } from "@/lib/prisma";

export async function getPageViews() : Promise<PageView[]> {
  const pageViews = await prisma.pageView.findMany();
  return pageViews;
}

export async function getPageViewsCount() {
  const pageViews = await prisma.pageView.count();
  return pageViews;
}