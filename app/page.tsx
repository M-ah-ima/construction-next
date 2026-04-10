"use client";
import React, { useState, useEffect } from 'react';

/**
 * ARSHERP - Final Unified Solution
 * Fixed: Missing footer tags and closing brackets.
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

  const handleLogin = (e) => {
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

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.pass !== formData.confirmPass) return setStatus('PASSWORDS DO NOT MATCH');
    setUsers([...users, { id: formData.id, pass: formData.pass }]);
    setCurrentPage('login');
  };

  const Header = () => (
    <nav className="flex items-center justify-between px-12 py-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#e67e22] text-white flex items-center justify-center font-black text-2xl rounded-sm">A</div>
        <div className="text-left">
          <h1 className="text-xl font-black text-[#1a2b48] leading-none uppercase">ARSHERP</h1>
          <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">A Product of Arsh Corporation</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-gray-700 uppercase tracking-widest">
        {['home', 'features', 'pricing', 'about', 'contact'].map(item => (
          <button 
            key={item} 
            onClick={() => setCurrentPage(item)} 
            className={`hover:text-orange-500 transition-all ${currentPage === item ? 'text-orange-500' : ''}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
        <button 
          onClick={() => isLoggedIn ? setCurrentPage('dashboard') : setCurrentPage('login')} 
          className="bg-[#0f172a] text-white px-8 py-2.5 rounded-full font-bold shadow-lg uppercase"
        >
          Dashboard
        </button>
      </div>
    </nav>
  );

  if (!isLoggedIn && (currentPage === 'login' || currentPage === 'signup')) {
    return (
      <div className="h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden">
        <div className="bg-white p-12 rounded-[2.5rem] w-full max-w-sm shadow-2xl">
          <h2 className="text-center font-black text-[#1a2b48] text-xl mb-8 uppercase">{currentPage}</h2>
          <form onSubmit={currentPage === 'login' ? handleLogin : handleSignUp} className="space-y-4">
            <input type="text" placeholder="ID / EMAIL" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" onChange={e => setFormData({...formData, id: e.target.value})}/>
            <input type="password" placeholder="PASSWORD" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" onChange={e => setFormData({...formData, pass: e.target.value})}/>
            <button className="w-full bg-[#e67e22] text-white py-5 rounded-2xl font-black uppercase text-xs">Continue</button>
          </form>
          <button onClick={() => setCurrentPage(currentPage==='login'?'signup':'login')} className="w-full mt-4 text-[#1a2b48] font-bold text-[10px] uppercase underline text-center">Switch Mode</button>
        </div>
      </div>
    );
  }

  if (isLoggedIn && currentPage === 'dashboard') {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <Header />
        <div className="flex flex-1 p-10 gap-10">
          <aside className="w-72 bg-[#1a233a] rounded-[2.5rem] p-10 flex flex-col shadow-2xl text-white">
            <span className="text-[#e67e22] text-[10px] font-black uppercase tracking-[0.3em] mb-12">ADMIN PANEL</span>
            <nav className="flex flex-col gap-8">
              {['Projects', 'Materials', 'Workers', 'Safety', 'Reports', 'Settings'].map((item) => (
                <button key={item} onClick={() => setActiveTab(item)} className={`flex items-center gap-3 text-xs font-bold transition-all ${activeTab === item ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${activeTab === item ? 'bg-[#e67e22]' : 'bg-slate-600'}`}></div>
                  {item.toUpperCase()}
                </button>
              ))}
            </nav>
            <button onClick={() => setIsLoggedIn(false)} className="mt-auto text-xs font-black text-red-400 uppercase text-left">Logout</button>
          </aside>
          <main className="flex-1 pt-4">
            <h2 className="text-3xl font-black text-[#1a2b48] uppercase tracking-tight mb-16">{activeTab} Overview</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="p-10 border border-gray-100 rounded-[2rem] shadow-sm"><p className="text-[10px] font-black text-slate-400 uppercase mb-2">Active Sites</p><h3 className="text-6xl font-black text-[#1a2b48]">12</h3></div>
              <div className="p-10 border-2 border-[#1a2b48] rounded-[2rem] shadow-lg"><p className="text-[10px] font-black text-slate-400 uppercase mb-2">Tasks Pending</p><h3 className="text-6xl font-black text-[#1a2b48]">45</h3></div>
              <div className="p-10 border border-gray-100 rounded-[2rem] shadow-sm"><p className="text-[10px] font-black text-slate-400 uppercase mb-2">Alerts</p><h3 className="text-6xl font-black text-red-600">03</h3></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    if (currentPage === 'home') {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#1a2b48] max-w-5xl leading-[1.1] uppercase tracking-tighter">
            Simplify Construction <br /> with <span className="text-[#e67e22]">Smart Software</span>
          </h1>
          <p className="mt-8 text-gray-400 text-lg md:text-xl font-medium max-w-2xl">
            Plan, track, and manage your projects efficiently in one platform.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <button onClick={() => setCurrentPage('login')} className="bg-[#e67e22] text-white px-12 py-5 rounded-xl font-black text-xs uppercase shadow-2xl">
              Get Started
            </button>
            <button className="bg-white text-[#1a2b48] border-2 border-gray-100 px-12 py-5 rounded-xl font-black text-xs uppercase hover:bg-gray-50 transition-all">
              Watch Demo Video
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-black text-gray-300 uppercase tracking-[0.5em] animate-pulse">
          {currentPage} Section Coming Soon
        </h2>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {renderMainContent()}
      </main>
      <footer className="w-full bg-[#1a233a] py-8 flex flex-col items-center border-t-8 border-[#e67e22]">
        <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-white uppercase">
          <span>ARSHERP</span><span className="text-gray-600">|</span><span>A PRODUCT OF ARSH CORPORATION</span>
        </div>
        <p className="text-[8px] text-gray-500 mt-2 uppercase font-bold tracking-widest">© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}
