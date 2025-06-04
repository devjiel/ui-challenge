import Header from "@/components/layout/Header";
import HeadCard from "@/components/ui/HeadCard";
import PageViewTable from "@/components/ui/tables/PageViewsCard";
import PageSessionsCard from "@/components/ui/tables/PageSessionsCard";
import PageInteractionsCard from "@/components/ui/tables/PageInteractionsCard";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Activity, Clock4, Eye, Users } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HeadCard title="Total Page Views" footer="Updated in real-time" cardAction={<Eye className="w-4 h-4" />} />
          <HeadCard title="Active Sessions" footer="Current active users" cardAction={<Activity className="w-4 h-4" />} />
          <HeadCard title="Unique Users" footer="Today's unique visitors" cardAction={<Users className="w-4 h-4" />} />
          <HeadCard title="Avg. Session Duration" footer="Average time on site" cardAction={<Clock4 className="w-4 h-4" />} />
        </div>
        <Tabs defaultValue="page-views" className="w-full flex flex-col gap-6">
          <TabsList>
            <TabsTrigger value="page-views">Page Views</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          <TabsContent value="page-views">
            <PageViewTable />
          </TabsContent>
          <TabsContent value="sessions">
            <PageSessionsCard />
          </TabsContent>
          <TabsContent value="interactions">
            <PageInteractionsCard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
