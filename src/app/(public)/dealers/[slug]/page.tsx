"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { MOCK_VEHICLES } from "@/lib/mocks";
import { ShieldCheck, BadgeCheck, Building2, ChevronRight } from "lucide-react";

export default function DealerProfilePage() {
  const dealerVehicles = MOCK_VEHICLES.filter(v => v.is_iom_stock);

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-zinc-900 border border-white/5 p-12 md:p-20 mb-20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
             <BadgeCheck className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-black border border-white/20 flex items-center justify-center font-display text-5xl text-white italic ring-2 ring-white/5">IOM</div>
            <div className="flex-grow space-y-6">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest leading-none mb-0">IOMCars Official <span className="text-white bg-white/10 px-4 italic">Showroom</span></h1>
                <ShieldCheck className="w-8 h-8 text-white hidden md:block" />
              </div>
              <p className="max-w-3xl text-zinc-500 font-body text-base leading-relaxed mb-10 italic">The premier destination for luxury automotive enthusiasts in East Africa. Curating heritage and modern performance with absolute distinction.</p>
              <div className="flex flex-wrap gap-12 border-t border-white/5 pt-10">
                <div>
                  <div className="text-4xl font-display text-white">{dealerVehicles.length}</div>
                  <div className="text-xs text-zinc-600 uppercase tracking-widest mt-1 font-display">Active Fleet Inventory</div>
                </div>
                <div>
                  <div className="text-4xl font-display text-white">12</div>
                  <div className="text-xs text-zinc-600 uppercase tracking-widest mt-1 font-display">Years of Distinction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-8">
            <h2 className="text-3xl font-display uppercase tracking-widest leading-none mb-0">Current Stock <span className="text-white bg-white/10 px-4 italic">Analysis</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {dealerVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
