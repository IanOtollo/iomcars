"use client";

import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { MapPin, Phone, MessageSquare, Award, BadgeCheck } from "lucide-react";

export default function ContactPage() {
  const AGENTS = [
    { name: "John Kamau", role: "Elite Asset Specialist", specialty: "Luxury Sedans & SUVs", deals: 156, avatar: "JK" },
    { name: "Sarah Otieno", role: "Motorbike Consultant", specialty: "Superbikes & Dirt Bikes", deals: 89, avatar: "SO" },
    { name: "Ahmed Hassan", role: "Commercial Logistics", specialty: "Heavy Duty & Trucks", deals: 212, avatar: "AH" }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-zinc-600 font-display text-sm tracking-[0.4em] uppercase mb-6 block underline underline-offset-[10px] decoration-white/10 font-bold">Asset Consultation</span>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-widest leading-[0.85] mb-8">Connect With Distinction</h1>
          </div>
        </section>

        <section className="py-32 bg-white text-black">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-display uppercase mb-16 border-b-2 border-black pb-6 tracking-tighter">Specialist Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {AGENTS.map((agent) => (
                <div key={agent.name} className="flex items-center gap-8 p-10 border border-black/5 hover:bg-black hover:text-white transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-black flex items-center justify-center font-display text-xl text-white group-hover:bg-white group-hover:text-black transition-colors ring-1 ring-black/10">
                    {agent.avatar}
                  </div>
                  <div>
                    <h4 className="font-display uppercase tracking-widest text-xl mb-1">{agent.name}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-display">{agent.role}</p>
                    <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-zinc-400 font-display">
                       <Award className="w-4 h-4" /> {agent.specialty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
