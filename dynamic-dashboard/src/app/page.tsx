import Header from "@/components/layout/Header";
import PageViewCard from "@/components/ui/PageViewCard";
import SessionCard from "@/components/ui/SessionCard";
import InteractionCard from "@/components/ui/InteractionCard";
import DashboardTabs from "@/components/layout/DashboardTabs";
import PageViewTable from "@/components/ui/tables/PageViewsCard";
import PageSessionsCard from "@/components/ui/tables/PageSessionsCard";
import PageInteractionsCard from "@/components/ui/tables/PageInteractionsCard";

export default async function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PageViewCard />
          <SessionCard />
          <InteractionCard />
          <PageViewCard />
        </div>
        <DashboardTabs pageViews={<PageViewTable />} sessions={<PageSessionsCard />} interactions={<PageInteractionsCard />} />
      </main>
    </div>
  );
}
