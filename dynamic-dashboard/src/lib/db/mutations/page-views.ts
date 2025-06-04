import { prisma } from "@/lib/prisma";

export async function createPageView(pageUrl: string, pageTitle: string, referrer: string, viewedAt: Date) {
  const pageView = await prisma.pageView.create({
    data: { pageUrl, pageTitle, referrer, viewedAt },
  });
  return pageView;
}