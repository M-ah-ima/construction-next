"use client";
import React, { useState, useEffect } from 'react';

/**
 * ARSHERP - Final Stable Version
 * Fixes: Build errors, Sidebar alignment, Contact info added.
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
      setCurrentPage('dashboard');
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
    <nav className="flex flex-col md:flex-row items-center justify-between px-5 md:px-12 py-4 md:py-6 bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#e67e22] text-white flex items-center justify-center font-black text-lg md:text-2xl rounded-sm">A</div>
          <div className="text-left">
            <h1 className="text-sm md:text-xl font-black text-[#1a2b48] leading-none uppercase">ARSHERP</h1>
            <p className="text-[7px] md:text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">A Product of Arsh Corporation</p>
          </div>
        </div>
        <button 
          onClick={() => isLoggedIn ? setCurrentPage('dashboard') : setCurrentPage('login')} 
          className="md:hidden bg-[#0f172a] text-white px-4 py-2 rounded-full font-bold text-[9px] uppercase shadow-md"
        >
          Dashboard
        </button>
      </div>
      
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
        <div className="flex flex-col items-center justify-center text-center px-4 py-10 md:py-20 w-full min-h-[60vh]">
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

    if (currentPage === 'features') {
      return (
        <div className="px-5 py-16 md:px-20 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b48] uppercase mb-12 text-center tracking-tighter">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Project Tracking", d: "Real-time updates on your construction progress and milestones." },
              { t: "Inventory Management", d: "Keep track of materials, waste, and stock levels effortlessly." },
              { t: "Labor Management", d: "Manage worker attendance, shifts, and daily wage records." }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full mb-6 flex items-center justify-center text-[#e67e22] font-bold">0{i+1}</div>
                <h3 className="text-lg font-black text-[#1a2b48] mb-4 uppercase">{f.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentPage === 'pricing') {
      return (
        <div className="px-5 py-16 md:px-20 max-w-5xl mx-auto text-center min-h-[60vh]">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b48] uppercase mb-4 tracking-tighter">Pricing Plans</h2>
          <p className="text-gray-400 mb-12 uppercase font-bold text-[10px] tracking-widest text-center">Transparent pricing for everyone</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-10 border-2 border-gray-100 rounded-[2.5rem] bg-white">
              <h3 className="font-black text-xl mb-2 uppercase text-[#1a2b48]">Starter</h3>
              <div className="text-4xl font-black text-[#e67e22] mb-6">$49<span className="text-sm text-gray-400">/mo</span></div>
              <ul className="text-left space-y-4 mb-8 text-sm font-bold text-gray-600 uppercase">
                <li>• Up to 3 Projects</li>
                <li>• Basic Reporting</li>
              </ul>
              <button className="w-full py-4 border-2 border-[#1a2b48] rounded-xl font-black uppercase text-[10px]">Choose Starter</button>
            </div>
            <div className="p-10 bg-[#1a2b48] text-white rounded-[2.5rem] shadow-2xl">
              <h3 className="font-black text-xl mb-2 uppercase text-[#e67e22]">Enterprise</h3>
              <div className="text-4xl font-black text-white mb-6">$199<span className="text-sm text-gray-300">/mo</span></div>
              <ul className="text-left space-y-4 mb-8 text-sm font-bold text-gray-300 uppercase">
                <li>• Unlimited Projects</li>
                <li>• Advanced Analytics</li>
              </ul>
              <button className="w-full py-4 bg-[#e67e22] rounded-xl font-black uppercase text-[10px]">Contact Sales</button>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'about') {
      return (
        <div className="px-5 py-16 md:px-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b48] uppercase mb-8 tracking-tighter">About ArshERP</h2>
          <p className="text-gray-500 text-lg leading-loose font-medium max-w-2xl mx-auto">
            ArshERP is a modern solution designed specifically for the construction industry. 
            A product of <span className="text-[#e67e22] font-black">Arsh Corporation</span>.
          </p>
          <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 inline-block">
             <p className="text-[10px] font-black text-[#e67e22] uppercase tracking-[0.2em]">Our Mission</p>
             <p className="mt-2 font-bold text-[#1a2b48] uppercase text-sm">Building the future of construction technology.</p>
          </div>
        </div>
      );
    }

    if (currentPage === 'contact') {
      return (
        <div className="px-5 py-16 md:px-20 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b48] uppercase mb-4 tracking-tighter">Contact Us</h2>
          <p className="text-gray-400 mb-12 uppercase font-bold text-[10px] tracking-widest">Get in touch with us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
               <h4 className="text-[10px] font-black uppercase text-[#e67e22] mb-3">Call Us</h4>
               <p className="text-sm font-black text-[#1a2b48]">+880 1234 567890</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
               <h4 className="text-[10px] font-black uppercase text-[#e67e22] mb-3">Email Us</h4>
               <p className="text-sm font-black text-[#1a2b48]">info@arshcorp.com</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
               <h4 className="text-[10px] font-black uppercase text-[#e67e22] mb-3">Visit Us</h4>
               <p className="text-sm font-black text-[#1a2b48]">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isLoggedIn && (currentPage === 'login' || currentPage === 'signup')) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4">
        <button onClick={() => setCurrentPage('home')} className="mb-6 text-white/50 hover:text-white uppercase font-black text-[10px] tracking-widest transition-all">← Back to Site</button>
        <div className="bg-white p-8 md:p-12 rounded-[2rem] w-full max-w-sm shadow-2xl">
          <h2 className="text-center font-black text-[#1a2b48] text-xl mb-8 uppercase tracking-widest">{currentPage}</h2>
          <form onSubmit={currentPage === 'login' ? handleLogin : handleSignUp} className="space-y-4">
            <input type="text" placeholder="ID / EMAIL" className="w-full p-4 bg-gray-50 border rounded-xl outline-none text-[#1a2b48] font-bold" onChange={e => setFormData({...formData, id: e.target.value})}/>
            <input type="password" placeholder="PASSWORD" className="w-full p-4 bg-gray-50 border rounded-xl outline-none text-[#1a2b48] font-bold" onChange={e => setFormData({...formData, pass: e.target.value})}/>
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
      <div className="min-h-screen bg-white flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-[#1a233a] p-8 flex flex-col text-white min-h-[400px] md:min-h-screen">
          <div className="mb-10">
            <h1 className="text-xl font-black text-white leading-none uppercase tracking-tighter">ARSHERP</h1>
            <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Admin Control</p>
          </div>
          <nav className="flex flex-col gap-6">
            {['Projects', 'Materials', 'Workers', 'Reports'].map((item) => (
              <button key={item} onClick={() => setActiveTab(item)} className={`flex items-center gap-2 text-[10px] font-black transition-all ${activeTab === item ? 'text-white' : 'text-slate-400'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${activeTab === item ? 'bg-[#e67e22]' : 'bg-slate-600'}`}></div>
                {item.toUpperCase()}
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-10 flex flex-col gap-5 border-t border-slate-700">
            <button onClick={() => setCurrentPage('home')} className="text-[10px] font-black text-[#e67e22] uppercase text-left tracking-[0.2em]">← BACK TO SITE</button>
            <button onClick={() => {setIsLoggedIn(false); setCurrentPage('home');}} className="text-[10px] font-black text-red-400 uppercase text-left tracking-[0.2em]">LOGOUT</button>
          </div>
        </aside>
        
        <main className="flex-1 p-6 md:p-12 bg-gray-50">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-[#1a2b48] uppercase tracking-tighter">{activeTab}</h2>
            <div className="w-10 h-10 bg-[#e67e22] rounded-full flex items-center justify-center font-bold text-white shadow-lg">A</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-7 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex justify-between mb-4">
                  <span className="text-[9px] font-black bg-orange-50 text-[#e67e22] px-3 py-1 rounded-full uppercase">Active</span>
                  <span className="text-[9px] font-black text-gray-400 uppercase">#ID-00{i+1}</span>
                </div>
                <h3 className="font-black text-[#1a2b48] uppercase text-sm mb-2">{activeTab} Record</h3>
                <p className="text-[11px] text-gray-400 font-bold mb-4 uppercase">Update for construction monitoring.</p>
                <div className="w-full bg-gray-100 h-1 rounded-full"><div className="bg-[#e67e22] h-full w-2/3"></div></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {renderMainContent()}
      </main>
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2024 Arsh Corporation. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
