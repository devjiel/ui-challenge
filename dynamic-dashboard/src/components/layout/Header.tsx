'use client'

import { useEffect, useState } from "react"

export default function Header() {
    const [connectionStatus, setConnectionStatus] = useState<string>("Connecting...")

    useEffect(() => {
        const eventSource = new EventSource("/api/sse")

        eventSource.onopen = () => {
            setConnectionStatus("Live data connection established")
        }

        eventSource.onerror = (event) => {
            setConnectionStatus("Connection failed")
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <header className="bg-white shadow-md">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Web analytics Dashboard</h1>
                <div className="text-sm text-gray-500">{connectionStatus}</div>
            </div>
        </header>
    )
}