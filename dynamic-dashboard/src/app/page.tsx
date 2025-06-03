import Header from "@/components/layout/Header";
import ViewCard from "@/components/ui/ViewCard";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ViewCard title="Total Page Views" />
          <ViewCard title="Active Sessions" />
          <ViewCard title="Unique Users" />
          <ViewCard title="Avg. Session Duration" />
        </div>
      </main>
    </div>
  );
}
