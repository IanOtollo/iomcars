"use client";

import { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LeadFormProps {
  vehicleId?: string;
  vehicleTitle?: string;
  type?: "inquiry" | "booking";
}

export function LeadForm({ vehicleId, vehicleTitle, type = "inquiry" }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-white/10 p-12 text-center space-y-8 shadow-2xl"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto ring-8 ring-white/5">
          <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-display uppercase tracking-widest text-white italic">Protocol Initialized</h3>
          <p className="text-sm text-zinc-500 uppercase tracking-widest leading-relaxed">
            Your request has been prioritized. An IOM specialist will initiate contact within 45 minutes for the <span className="text-white italic">{vehicleTitle || "Asset"}</span>.
          </p>
        </div>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-xs text-zinc-600 hover:text-white uppercase tracking-[0.4em] underline underline-offset-8 font-display transition-colors"
        >
          Return to Console
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-white/5 p-12 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        <div className="space-y-2">
          <span className="text-xs text-zinc-600 font-display tracking-[0.4em] uppercase block">Asset Protocol</span>
          <h2 className="text-4xl font-display text-white uppercase tracking-widest mb-0 leading-none italic">{type === "booking" ? "Secure Reservation" : "Inquiry Bureau"}</h2>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs text-zinc-600 uppercase tracking-widest font-display font-bold">Legal Name</label>
              <div className="relative">
                <input required type="text" placeholder="Johnathan Doe" className="w-full bg-black/50 border border-white/5 p-5 text-sm font-display text-white focus:border-white transition-all outline-none tracking-widest" />
                <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs text-zinc-600 uppercase tracking-widest font-display font-bold">Communication Number</label>
              <div className="relative">
                <input required type="tel" placeholder="+254..." className="w-full bg-black/50 border border-white/5 p-5 text-sm font-display text-white focus:border-white transition-all outline-none tracking-widest font-mono" />
                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs text-zinc-600 uppercase tracking-widest font-display font-bold">Electronic Mail</label>
            <div className="relative">
              <input required type="email" placeholder="client@iom-enterprise.com" className="w-full bg-black/50 border border-white/5 p-5 text-sm font-display text-white focus:border-white transition-all outline-none tracking-widest" />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
            </div>
          </div>

          {type === "booking" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs text-zinc-600 uppercase tracking-widest font-display font-bold">Preferred Date</label>
                <div className="relative">
                  <input required type="date" className="w-full bg-black/50 border border-white/5 p-5 text-sm font-display text-white focus:border-white transition-all outline-none tracking-widest" />
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs text-zinc-600 uppercase tracking-widest font-display font-bold">Showroom Location</label>
                <select className="w-full bg-black/50 border border-white/5 p-5 text-sm font-display text-white focus:border-white transition-all outline-none tracking-widest appearance-none">
                  <option>Westlands Corporate</option>
                  <option>Karen Private Wing</option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-xs text-zinc-600 uppercase tracking-widest font-display font-bold">Asset Observations</label>
            <div className="relative">
              <textarea placeholder="Specify requirements..." rows={4} className="w-full bg-black/50 border border-white/5 p-5 text-sm font-display text-white focus:border-white transition-all outline-none tracking-widest resize-none" />
              <MessageSquare className="absolute right-5 top-5 w-4 h-4 text-zinc-800" />
            </div>
          </div>
        </div>

        <button 
          disabled={isSubmitting}
          className="btn-gold !w-full !py-6 text-sm flex items-center justify-center gap-4 relative overflow-hidden group shadow-2xl"
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> <span>Deploy Request</span></>}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-4 opacity-40">
        <ShieldCheck className="w-5 h-5 text-zinc-400" />
        <p className="text-xs text-zinc-700 uppercase tracking-widest text-center italic">
          Secured via IOM 256-bit AES Protocol &bull; Verified Asset Center
        </p>
      </div>
    </div>
  );
}
