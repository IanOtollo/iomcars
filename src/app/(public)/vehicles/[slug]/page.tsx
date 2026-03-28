"use client";

import { useState } from "react";
import Link from "next/link";
/* Precise Relative Imports for Level 4 Depth (src/app/(public)/vehicles/[slug]) */
import { Navbar } from "../../../../components/layout/Navbar";
import { Footer } from "../../../../components/layout/Footer";
import { LeadForm } from "../../../../components/vehicles/LeadForm";
import { 
  ShieldCheck, 
  ArrowRightLeft,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Zap,
  ChevronRight,
  Heart,
  Share2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../../lib/utils";
import { MOCK_VEHICLES } from "../../../../lib/mocks";
import { VehicleIcon } from "../../../../components/vehicles/VehicleIcon";

export default function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const [showBooking, setShowBooking] = useState(false);
  const VEHICLE = MOCK_VEHICLES.find(v => v.slug === params.slug) || MOCK_VEHICLES[0]; 

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-20">
        <div className="flex items-center gap-3 text-sm text-zinc-600 uppercase tracking-widest mb-10 font-bold">
          <Link href="/" className="hover:text-white transition-colors">Home Bureau</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href="/vehicles" className="hover:text-white transition-colors">Inventory Portfolio</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-white italic bg-white/10 px-4 py-1">{VEHICLE.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3 space-y-16">
            <AnimatePresence mode="wait">
              {showBooking ? (
                <motion.div 
                  key="booking-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <LeadForm type="booking" vehicleId={VEHICLE.id} vehicleTitle={VEHICLE.title} />
                </motion.div>
              ) : (
                <motion.div 
                  key="media-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-16"
                >
                  <section>
                    <div className="relative aspect-[16/9] bg-zinc-900 border border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-2xl">
                      <img 
                        src={VEHICLE.images[0]} 
                        alt={VEHICLE.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-6 left-6">
                        {VEHICLE.is_iom_stock && (
                          <span className="bg-white text-black text-xs font-display px-4 py-2 flex items-center gap-3 uppercase tracking-widest font-bold shadow-2xl">
                            <ShieldCheck className="w-4 h-4" /> IOM Verified Asset
                          </span>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-10">
                    <div>
                      <h1 className="text-5xl md:text-7xl font-display text-white mb-6 uppercase tracking-widest italic">{VEHICLE.title}</h1>
                      <div className="flex flex-col">
                        <span className="text-xs text-zinc-700 uppercase tracking-widest mb-2 font-display font-bold">Acquisition Valuation</span>
                        <span className="text-4xl md:text-5xl font-display text-white italic">KES {VEHICLE.price_kes.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
                      {[
                        { icon: Calendar, label: "Year Produced", value: VEHICLE.year },
                        { icon: Gauge, label: "Path Traversed", value: `${VEHICLE.mileage} KM` },
                        { icon: Fuel, label: "Power Source", value: VEHICLE.fuel_type },
                        { icon: Settings, label: "Transmission", value: VEHICLE.transmission },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-3">
                           <item.icon className="w-5 h-5 text-zinc-700" />
                           <div className="text-xs text-zinc-700 uppercase tracking-widest font-display font-bold">{item.label}</div>
                           <div className="text-sm font-display text-zinc-400 uppercase tracking-widest font-bold">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <p className="text-sm md:text-base leading-relaxed text-zinc-500 uppercase tracking-wider opacity-60">
                        This {VEHICLE.make} represents the pinnacle of its class. Rigorously inspected under the IOM Private Protocol, this asset ensures unparalleled performance and distinguished heritage. Acquisition includes full certification and technical bureau validation.
                      </p>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:w-1/3">
            <div className="sticky top-32 space-y-10">
              <div className="bg-zinc-900 border border-white/10 p-10 space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <button 
                  onClick={() => setShowBooking(true)}
                  className="btn-gold !w-full !py-6 text-sm flex items-center justify-center gap-4 relative overflow-hidden group shadow-2xl"
                >
                   <Zap className="w-5 h-5" />
                   <span>Initiate Acquisition</span>
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShowBooking(true)} className="btn-outline !w-full !px-3 text-xs py-5">Reserve Asset</button>
                  <Link href="/checkout" className="btn-outline !w-full !px-3 text-xs py-5 flex items-center justify-center">Direct Transfer</Link>
                </div>
                <div className="flex items-center gap-4 pt-6 opacity-30">
                  <Lock className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Secured via IOM 256-bit Protocol</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
