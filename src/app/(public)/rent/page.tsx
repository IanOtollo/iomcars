"use client";

import { useState } from "react";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { VehicleCard } from "../../../components/vehicles/VehicleCard";
import { MOCK_VEHICLES } from "../../../lib/mocks";
import { Calendar, Clock, Grid2X2, List } from "lucide-react";
import { cn } from "@/lib/utils";

const RENTAL_VEHICLES = MOCK_VEHICLES.filter(v => v.rental_price_daily);

export default function RentPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-24">
          <span className="text-zinc-500 font-display tracking-[0.6em] uppercase text-xs mb-6 block underline underline-offset-[12px] decoration-white/10">Premium Lease & Rental</span>
          <h1 className="text-7xl md:text-[8rem] font-display text-white mb-10 tracking-tighter uppercase leading-[0.8] font-bold">
            Drive Your <span className="italic bg-white/10 px-6">Ambition</span>
          </h1>
          
          <div className="bg-zinc-900 border border-white/10 p-6 md:p-10 flex flex-col md:row items-center gap-8 shadow-2xl max-w-5xl">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="flex items-center gap-6 bg-black/60 border border-white/5 px-6 py-5">
                <Calendar className="w-5 h-5 text-white" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest leading-none mb-2">Acquisition Date</span>
                  <span className="text-xs text-white uppercase tracking-widest">Select Calendar...</span>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-black/60 border border-white/5 px-6 py-5">
                <Clock className="w-5 h-5 text-white" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest leading-none mb-2">Duration Epoch</span>
                  <span className="text-xs text-white uppercase tracking-widest">1 - 30 Days Portfolio</span>
                </div>
              </div>
            </div>
            <button className="btn-gold !py-5 !px-16 w-full md:w-auto text-sm">Verify Availability</button>
          </div>
        </div>

        <div className="flex flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-10">
          <div className="text-xs text-zinc-500 font-display tracking-[0.3em] uppercase">
            Active Rental Fleet ({RENTAL_VEHICLES.length})
          </div>
          <div className="flex bg-zinc-900 border border-white/5 p-1">
            <button onClick={() => setView("grid")} className={cn("p-3 transition-colors", view === "grid" ? "text-white bg-white/10" : "text-zinc-700")}>
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button onClick={() => setView("list")} className={cn("p-3 transition-colors", view === "list" ? "text-white bg-white/10" : "text-zinc-700")}>
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={cn(
          "grid gap-12",
          view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {RENTAL_VEHICLES.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} view={view} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
