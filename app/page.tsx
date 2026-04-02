'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('management');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'management', label: 'Management' },
    { id: 'material', label: 'Material' },
    { id: 'labour', label: 'Labour' },
    { id: 'payments', label: 'Payments' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg">A</div>
            <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">ARSH<span className="text-amber-600">ERP</span></div>
          </div>

          <ul className="hidden md:flex gap-8 text-sm font-bold text-slate-600 items-center">
            <li className="hover:text-amber-600 cursor-pointer transition">Dashboard</li>
            <li className="hover:text-amber-600 cursor-pointer transition">Projects</li>
            <li className="hover:text-amber-600 cursor-pointer transition">Reports</li>
            <li className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-amber-600 cursor-pointer transition">Admin Login</li>
          </ul>

          <button className="md:hidden p-2 text-slate-900 font-bold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 font-bold text-slate-700">
            <p className="px-4 py-2 hover:bg-slate-50 rounded-lg">Dashboard</p>
            <p className="px-4 py-2 hover:bg-slate-50 rounded-lg">Projects</p>
            <p className="px-4 py-2 hover:bg-slate-50 rounded-lg">Reports</p>
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl">Admin Login</button>
          </div>
        )}
      </header>

      <section className="bg-slate-900 text-white py-12 md:py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight uppercase tracking-tighter">
          Build Better with <br className="hidden md:block" /> <span className="text-amber-500">Smart Management</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
          Real-time tracking for Materials, Labour, and Financials. Streamline your construction workflow.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-10 pb-20">
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl md:rounded-full shadow-xl border border-slate-100 max-w-2xl mx-auto mb-8 scroll-smooth">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl md:rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8">
            {activeTab === 'management' && (
              <div className="space-y-6 md:space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">Project Overview</h2>
                  <button className="w-full md:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-600 transition">+ New Project</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/50 text-blue-600">Active Sites: <span className="text-3xl font-black block text-slate-900">12</span></div>
                  <div className="p-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 text-emerald-600">Completed: <span className="text-3xl font-black block text-slate-900">145</span></div>
                  <div className="p-6 rounded-2xl border border-amber-100 bg-amber-50/50 text-amber-600">In Pipeline: <span className="text-3xl font-black block text-slate-900">5M sft</span></div>
                </div>
              </div>
            )}
            {/* বাকি কন্টেন্ট আগের মতোই থাকবে... */}
          </div>
        </div>
      </main>
      <footer className="py-10 border-t border-slate-200 text-center">
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">© 2026 ARSH CORPORATION</p>
      </footer>
    </div>
  );
}
