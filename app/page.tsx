"use client";
import React, { useState, useEffect } from 'react';

/**
 * ARSHERP - Final Unified Solution
 * Fixed: Navbar items uppercase and visible on mobile.
 */
export default function ArshERPApp() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [activeTab, setActiveTab] = useState('Projects');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [users, setUsers] = useState([{ id: 'admin@arsh.com', pass: '123456' }]);
  const [formData, setFormData] = useState({ id: '', pass: '', confirmPass: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('arsh_users');
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('arsh_users', JSON.stringify(users));
  }, [users, isMounted]);

  if (!isMounted) return null;

  const handleLogin = (e: any) => {
    e.preventDefault();
    const user = users.find(u => u.id === formData.id && u.pass === formData.pass);
    if (user) {
      setIsLoggedIn(true);
      setCurrentPage('home'); 
      setStatus('');
    } else {
      setStatus('INVALID CREDENTIALS');
    }
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    if (formData.pass !== formData.confirmPass) return setStatus('PASSWORDS DO NOT MATCH');
    setUsers([...users, { id: formData.id, pass: formData.pass }]);
    setCurrentPage('login');
  };

  const Header = () => (
    <nav className="flex flex-col md:flex-row items-center justify-between px-5 md:px-12 py-4 md:py-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#e67e22] text-white flex items-center justify-center font-black text-lg md:text-2xl rounded-sm">A</div>
          <div className="text-left">
            <h1 className="text-sm md:text-xl font-black text-[#1a2b48] leading-none uppercase">ARSHERP</h1>
            <p className="text-[7px] md:text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">A Product of Arsh Corporation</p>
          </div>
        </div>
        {/* Mobile Dashboard Button */}
        <button 
          onClick={() => isLoggedIn ? setCurrentPage('dashboard') : setCurrentPage('login')} 
          className="md:hidden bg-[#0f172a] text-white px-4 py-2 rounded-full font-bold text-[9px] uppercase shadow-md"
        >
          Dashboard
        </button>
      </div>
      
      {/* Navbar Items - Fixed Uppercase and Visibility */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 text-[9px] md:text-[11px] font-bold text-gray-700 uppercase tracking-widest">
        {['home', 'features', 'pricing', 'about', 'contact'].map(item => (
          <button 
            key={item} 
            onClick={() => setCurrentPage(item)} 
            className={`hover:text-orange-500 transition-all ${currentPage === item ? 'text-orange-500' : ''}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
        {/* Desktop Dashboard Button */}
        <button 
          onClick={() => isLoggedIn ? setCurrentPage('dashboard') : setCurrentPage('login')} 
          className="hidden md:block bg-[#0f172a] text-white px-8 py-2.5 rounded-full font-bold shadow-lg uppercase"
        >
          Dashboard
        </button>
      </div>
    </nav>
  );

  const renderMainContent = () => {
    if (currentPage === 'home') {
      return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-10 md:py-20 w-full">
          <h1 className="text-[26px] sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#1a2b48] w-full max-w-4xl leading-[1.2] md:leading-[1.1] uppercase tracking-tighter">
            Simplify Construction <br className="hidden sm:block" /> with <span className="text-[#e67e22]">Smart Software</span>
          </h1>
          <p className="mt-4 md:mt-8 text-gray-400 text-[12px] md:text-lg font-medium max-w-[260px] md:max-w-2xl leading-relaxed">
            Plan, track, and manage your projects efficiently in one platform.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 w-full max-w-[240px] sm:max-w-none justify-center">
            <button onClick={() => setCurrentPage('login')} className="bg-[#e67e22] text-white px-8 py-4 rounded-xl font-black text-[10px] md:text-xs uppercase shadow-xl active:scale-95 transition-all">
              Get Started
            </button>
            <button className="bg-white text-[#1a2b48] border-2 border-gray-100 px-8 py-4 rounded-xl font-black text-[10px] md:text-xs uppercase active:scale-95 transition-all">
              Watch Demo Video
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 min-h-[300px]">
        <h2 className="text-lg md:text-2xl font-black text-gray-300 uppercase tracking-[0.2em] animate-pulse">
          {currentPage.toUpperCase()} Section Coming Soon
        </h2>
      </div>
    );
  };

  if (!isLoggedIn && (currentPage === 'login' || currentPage === 'signup')) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] w-full max-w-sm shadow-2xl">
          <h2 className="text-center font-black text-[#1a2b48] text-xl mb-8 uppercase tracking-widest">{currentPage}</h2>
          <form onSubmit={currentPage === 'login' ? handleLogin : handleSignUp} className="space-y-4">
            <input type="text" placeholder="ID / EMAIL" className="w-full p-4 bg-gray-50 border rounded-xl outline-none" onChange={e => setFormData({...formData, id: e.target.value})}/>
            <input type="password" placeholder="PASSWORD" className="w-full p-4 bg-gray-50 border rounded-xl outline-none" onChange={e => setFormData({...formData, pass: e.target.value})}/>
            {currentPage === 'signup' && (
              <input type="password" placeholder="CONFIRM PASSWORD" className="w-full p-4 bg-gray-50 border rounded-xl outline-none" onChange={e => setFormData({...formData, confirmPass: e.target.value})}/>
            )}
            {status && <p className="text-[10px] text-red-500 font-bold text-center uppercase">{status}</p>}
            <button className="w-full bg-[#e67e22] text-white py-4 rounded-xl font-black uppercase text-xs">Continue</button>
          </form>
          <button onClick={() => setCurrentPage(currentPage==='login'?'signup':'login')} className="w-full mt-4 text-[#1a2b48] font-bold text-[10px] uppercase underline text-center">Switch Mode</button>
        </div>
      </div>
    );
  }

  if (isLoggedIn && currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-x-hidden">
        <aside className="w-full md:w-64 bg-[#1a233a] p-6 md:p-8 flex flex-col text-white">
          <span className="text-[#e67e22] text-[9px] font-black uppercase tracking-[0.3em] mb-8">ADMIN PANEL</span>
          <nav className="grid grid-cols-2 md:flex md:flex-col gap-4 md:gap-6">
            {['Projects', 'Materials', 'Workers', 'Reports'].map((item) => (
              <button key={item} onClick={() => setActiveTab(item)} className={`flex items-center gap-2 text-[10px] font-bold ${activeTab === item ? 'text-white' : 'text-slate-400'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${activeTab === item ? 'bg-[#e67e22]' : 'bg-slate-600'}`}></div>
                {item.toUpperCase()}
              </button>
            ))}
          </nav>
          <button onClick={() => setIsLoggedIn(false)} className="mt-8 md:mt-auto text-[10px] font-black text-red-400 uppercase">Logout</button>
        </aside>
        <main className="flex-1 p-5 md:p-10 bg-gray-50">
          <Header />
          <h2 className="text-xl md:text-3xl font-black text-[#1a2b48] uppercase my-8">{activeTab.toUpperCase()} Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {[{l:'Sites', v:'12'}, {l:'Tasks', v:'45'}, {l:'Alerts', v:'03', c:'text-red-600'}].map((s, i) => (
              <div key={i} className="p-6 md:p-10 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">{s.l.toUpperCase()}</p>
                <h3 className={`text-4xl md:text-6xl font-black ${s.c || 'text-[#1a2b48]'}`}>{s.v}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {renderMainContent()}
      </main>
      <footer className="w-full bg-[#1a233a] py-6 px-10 border-t border-[#e67e22] text-center">
         <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 ARSHERP. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
