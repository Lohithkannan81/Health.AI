import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';

export function GlassNavigation({ onNavigateLogin, onNavigateSignup, onNavigateDashboard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Dashboard', href: '#dashboard-preview' },
    { name: 'Documentation', href: '#docs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Floating Light Clinical Capsule Navbar */}
      <nav className="relative w-full rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md shadow-blue-500/5 px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 hover:border-blue-300">
        
        {/* Brand Logo: Health.AI */}
        <div 
          onClick={() => { setActiveLink('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                Health<span className="text-[#0066FF]">.AI</span>
              </span>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-[#0066FF]">
                CLINICAL SUITE
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 bg-slate-100/80 border border-slate-200 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setActiveLink(link.name);
                  if (link.name === 'Dashboard' && onNavigateDashboard) {
                    e.preventDefault();
                    onNavigateDashboard();
                  }
                }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive ? 'text-[#0066FF]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white border border-blue-200 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Action CTA Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onNavigateLogin}
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-[#0066FF] transition-colors duration-200"
          >
            Login
          </button>

          <button
            onClick={onNavigateSignup}
            className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="lg:hidden mt-3 w-full rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl z-50 relative"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    activeLink === link.name
                      ? 'bg-blue-50 text-[#0066FF] border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateLogin();
                }}
                className="w-full py-3 rounded-2xl bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-800"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSignup();
                }}
                className="w-full py-3 rounded-2xl bg-[#0066FF] text-sm font-bold text-white flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
