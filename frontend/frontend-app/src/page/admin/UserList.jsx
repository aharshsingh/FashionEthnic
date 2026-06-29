import React from 'react'
import UserTable from '../../component/UserTable'
import { Users } from 'lucide-react'
export default function UserList() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 lg:px-8 lg:pt-14 lg:pb-28">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-3 animate-fade-up">
          <span className="eyebrow w-fit">
            <Users className="h-3.5 w-3.5" /> Customers
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy md:text-5xl">
            Users List
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-navy/60">
            View and manage all registered users, monitor account activity, and access comprehensive user profiles.
          </p>
        </div>

        {/* Table panel */}
        <div className="rounded-2xl bg-white p-4 shadow-soft lg:p-6">
          <div className="overflow-x-auto">
            <UserTable />
          </div>
        </div>
      </div>
    </div>
  )
}
