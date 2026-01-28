'use client';

import { useState } from 'react';
import Navbar from './Navbar';

export type TabType = 'dashboard' | 'data';

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="min-h-screen">
      <Navbar onTabChange={setActiveTab} activeTab={activeTab} />

      <div className="bg-gray-50">
        {activeTab === 'dashboard' && (
          <iframe
            src="/red_flags_dashboard.html"
            className="w-full h-[calc(100vh-64px)] border-none"
            title="Dashboard"
          />
        )}

        {activeTab === 'data' && (
          <div className="p-6">
            <iframe
            src="/table.html"
            className="w-full h-[calc(100vh-64px)] border-none"
            title="data"
          />
          </div>
        )}
      </div>
    </div>
  );
}
