"use client";

import { useState } from "react";
/* Definitive Relative Imports for Level 3 Depth (src/app/(public)/sell-your-car) */
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { 
  Building2, 
  ChevronRight, 
  ShieldCheck,
  CheckCircle2,
  Lock
} from "lucide-react";
import { cn } from "../../../lib/utils";

export default function DealerRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-20">
        <div className="text-center mb-20">
          <span className="text-zinc-600 font-display text-sm tracking-[0.4em] uppercase mb-6 block underline underline-offset-[10px] decoration-white/10 font-bold">Network Certification</span>
          <h1 className="text-5xl md:text-6xl font-display uppercase tracking-widest leading-none mb-8 italic">IOM Partnership</h1>
          <p className="max-w-2xl mx-auto text-zinc-500 font-body text-base leading-relaxed uppercase tracking-widest opacity-60">Join the most prestigious automotive ecosystem in the region.</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-10 md:p-16 shadow-2xl space-y-12">
          {!submitted ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] text-zinc-600 uppercase tracking-widest font-display font-bold">Business Entity Name</label>
                  <input required type="text" placeholder="Authorized Dealer Ltd" className="w-full bg-black/40 border border-white/5 p-5 text-sm font-display outline-none focus:border-white text-white tracking-widest transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-zinc-600 uppercase tracking-widest font-display font-bold">KRA PIN Authentication</label>
                  <input required type="text" placeholder="P000..." className="w-full bg-black/40 border border-white/5 p-5 text-sm font-display outline-none focus:border-white text-white tracking-widest transition-all" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                 <button onClick={() => setSubmitted(true)} className="btn-gold !flex-grow !py-5 text-sm flex items-center justify-center gap-4 shadow-xl">
                   Initiate Verification <ChevronRight className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                <Lock className="w-6 h-6 text-zinc-800" />
                <p className="text-[10px] text-zinc-700 uppercase tracking-widest leading-relaxed">Secured under IOM 256-bit AES encryption standards. Compliance audit required.</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-display uppercase tracking-widest text-white italic">Protocol Initialized</h2>
              <p className="max-w-md mx-auto text-zinc-600 font-body text-xs leading-relaxed uppercase tracking-widest">Our specialists have flagged your entry for immediate verification.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs text-zinc-600 hover:text-white uppercase tracking-[0.4em] underline underline-offset-8 font-display transition-colors"
              >
                Revise Submission
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
