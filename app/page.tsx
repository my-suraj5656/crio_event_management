"use client";

import { useState } from "react";
import EventForm from "@/components/event-form";
import EventList from "@/components/event-list";
import EventDetail from "@/components/event-detail";

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            🎉 Event Management Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Create events, view registrations, and manage details
          </p>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <section className="lg:col-span-2 space-y-6">
          {/* Create Event */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Create New Event</h2>
            <EventForm />
          </div>

          {/* Event List */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Events</h2>
            <EventList onSelect={setSelectedEvent} />
          </div>
        </section>

        {/* Right Column */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[200px]">
            <h2 className="text-lg font-semibold mb-4">Event Details</h2>

            {selectedEvent ? (
              <EventDetail event={selectedEvent} />
            ) : (
              <p className="text-sm text-gray-500">
                Select an event to see details
              </p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
