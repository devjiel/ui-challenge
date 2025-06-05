'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardTabs({pageViews, sessions, interactions}: {pageViews: React.ReactNode, sessions: React.ReactNode, interactions: React.ReactNode}) {

  const [activeTab, setActiveTab] = useState("page-views")
  const router = useRouter()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.refresh()
  }

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col gap-6">
      <TabsList>
        <TabsTrigger value="page-views">Page Views</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="interactions">Interactions</TabsTrigger>
      </TabsList>
      <TabsContent value="page-views">
        {pageViews}
      </TabsContent>
      <TabsContent value="sessions">
        {sessions}
      </TabsContent>
      <TabsContent value="interactions">
        {interactions}
      </TabsContent>
    </Tabs>
  )
}