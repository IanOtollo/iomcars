import Link from "next/link";
import { ShieldCheck, Globe, ChevronRight, Send, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-12 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-display text-white tracking-tighter uppercase italic leading-none">IOM</span>
              <span className="text-2xl font-display text-white tracking-tighter uppercase leading-none">CARS</span>
            </div>
            <p className="text-zinc-500 font-body text-sm leading-relaxed max-w-xs italic uppercase tracking-[0.2em] opacity-60">
              The definitive ecosystem for premium automotive assets. Curating luxury, performance, and heritage.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="p-2 border border-white/5 text-zinc-700 hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 border border-white/5 text-zinc-700 hover:text-white transition-all">
                <Shield className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Detailed Navigation */}
          <div>
            <h3 className="text-xs font-display text-white tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
              Inventory <div className="h-[1px] flex-grow bg-white/5" />
            </h3>
            <div className="flex flex-col space-y-4">
              {[
                { label: "Luxury Sedans", href: "/vehicles?type=sedan" },
                { label: "Elite SUVs", href: "/vehicles?type=suv" },
                { label: "Sport Bikes", href: "/vehicles?type=motorbike" },
                { label: "Heavy Duty", href: "/vehicles?type=truck" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-zinc-600 hover:text-white uppercase tracking-widest transition-colors font-display italic group flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Corporate & Legal */}
          <div>
            <h3 className="text-xs font-display text-white tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
              Corporate <div className="h-[1px] flex-grow bg-white/5" />
            </h3>
            <div className="flex flex-col space-y-4">
              {[
                { label: "About IOM", href: "/about" },
                { label: "Sellers", href: "/sell-your-car" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-zinc-600 hover:text-white uppercase tracking-widest transition-colors font-display italic group flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Dispatch */}
          <div className="space-y-6">
            <h3 className="text-xs font-display text-white tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
              Dispatch <div className="h-[1px] flex-grow bg-white/5" />
            </h3>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-black/40 border border-white/5 p-4 text-xs uppercase tracking-widest font-display text-white focus:border-white transition-all outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-zinc-800 uppercase tracking-[0.3em] font-display italic">
            &copy; 2026 IOMCars Marketplace &bull; Distinction Since 2012
          </p>
          <div className="flex items-center gap-8 text-xs text-zinc-800 uppercase tracking-widest font-display font-bold">
            <span>Powered by IOM Techs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
