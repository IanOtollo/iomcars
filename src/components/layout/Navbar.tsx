"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-display text-white tracking-tighter uppercase italic">IOM</span>
            <span className="text-2xl md:text-3xl font-display text-white tracking-tighter uppercase">CARS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {[
              { label: "Inventory", href: "/vehicles" },
              { label: "Rental", href: "/rent" },
              { label: "Sell Your Asset", href: "/sell-your-car" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-display tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Action */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/vehicles"
              className="group flex items-center gap-3 bg-white text-black px-10 py-5 font-display text-sm tracking-widest uppercase hover:bg-zinc-200 transition-all active:scale-95"
            >
              Explore Fleet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 border border-white/10"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-8">
              <div className="flex flex-col space-y-6">
                {[
                  { label: "Inventory", href: "/vehicles" },
                  { label: "Rental", href: "/rent" },
                  { label: "Sell Your Asset", href: "/sell-your-car" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-display tracking-widest uppercase text-white border-b border-white/5 pb-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/vehicles"
                onClick={() => setIsOpen(false)}
                className="btn-gold !w-full !py-5 flex items-center justify-center gap-3 text-sm"
              >
                Explore Fleet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
