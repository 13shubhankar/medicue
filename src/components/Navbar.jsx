'use client'
import { useState } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'FAQ', href: '#faq' },
  { name: 'How it Works', href: '#how-it-works' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md fixed top-0 z-50 w-full shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-4xl tracking-tight text-green-700">
          <Image
            src="/logo.png"
            alt="Medicue Logo"
            width={25}
            height={10}
          />
          <span>Medicue</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/login" 
            className="px-4 py-2 rounded-2xl bg-green-600 text-white flex gap-2 items-center shadow-sm hover:bg-green-700 transition-colors"
          >
            <LogIn size={18} /> Log In
          </Link>
          <Link 
            href="/signup" 
            className="ml-2 px-4 py-2 rounded-2xl border border-green-600 text-green-700 flex gap-2 items-center hover:bg-green-50 transition-colors"
          >
            <UserPlus size={18} /> Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 rounded-2xl text-green-700" 
          onClick={() => setOpen(!open)} 
          aria-label="Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-6 md:hidden animate-fade-in-down">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-gray-700 hover:text-green-700 transition-colors font-medium" 
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-2xl bg-green-600 text-white flex gap-2 items-center shadow-sm hover:bg-green-700 transition-colors" 
              onClick={() => setOpen(false)}
            >
              <LogIn size={18} /> Log In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 rounded-2xl border border-green-600 text-green-700 flex gap-2 items-center hover:bg-green-50 transition-colors" 
              onClick={() => setOpen(false)}
            >
              <UserPlus size={18} /> Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
