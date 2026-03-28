"use client";

import Link from "next/link";
import { 
  ArrowUpRight, 
  Gauge, 
  Fuel, 
  Zap,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VehicleIcon } from "./VehicleIcon";

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price_kes: number;
  rental_price_daily?: number;
  type: "sedan" | "suv" | "motorbike" | "truck" | string;
  condition: "new" | "used";
  mileage: number;
  fuel_type: string;
  transmission: string;
  images: string[];
  is_verified?: boolean;
  is_iom_stock?: boolean;
  is_featured?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  view?: "grid" | "list";
}

export function VehicleCard({ vehicle, view = "grid" }: VehicleCardProps) {
  if (view === "list") {
    return (
      <Link href={`/vehicles/${vehicle.slug}`} className="group block bg-zinc-900/50 border border-white/5 hover:border-white transition-all overflow-hidden relative">
        <div className="flex flex-col md:flex-row h-full">
           <div className="relative w-full md:w-80 h-64 md:h-auto bg-black flex items-center justify-center border-r border-white/5 overflow-hidden">
            <img 
              src={vehicle.images[0]} 
              alt={vehicle.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            />
            {vehicle.is_iom_stock && (
              <div className="absolute top-6 left-6 bg-white text-black text-xs font-display px-5 py-2 uppercase tracking-widest z-10 font-bold">
                IOM Verified
              </div>
            )}
           </div>
           
           <div className="flex-grow p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-zinc-500 font-display uppercase tracking-[0.3em] font-bold">{vehicle.make} &bull; {vehicle.year}</span>
                  <span className="text-2xl font-display text-white">KES {vehicle.price_kes.toLocaleString()}</span>
                </div>
                <h3 className="text-3xl font-display text-white group-hover:text-white transition-colors mb-6 uppercase tracking-tighter italic leading-none">{vehicle.title}</h3>
                
                <div className="grid grid-cols-3 gap-12">
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-xs text-zinc-700 uppercase tracking-widest leading-none font-display font-bold">Path Traversed</span>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest font-mono">{vehicle.mileage} KM</span>
                  </div>
                   <div className="flex flex-col items-start gap-2">
                    <span className="text-xs text-zinc-700 uppercase tracking-widest leading-none font-display font-bold">Power Source</span>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest">{vehicle.fuel_type}</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-xs text-zinc-700 uppercase tracking-widest leading-none font-display font-bold">Shift Method</span>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest">{vehicle.transmission}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-zinc-500 uppercase tracking-widest mt-12 group-hover:text-white transition-colors font-display italic">
                Examine Asset <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
           </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-zinc-900/50 border border-white/5 hover:border-white transition-all overflow-hidden"
    >
      <Link href={`/vehicles/${vehicle.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
          <img 
            src={vehicle.images[0]} 
            alt={vehicle.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          {vehicle.is_iom_stock && (
            <div className="absolute top-6 left-6 bg-white text-black text-xs font-display px-4 py-2 uppercase tracking-widest z-10 shadow-2xl font-bold">
              IOM Verified Asset
            </div>
          )}
          {vehicle.rental_price_daily && (
            <div className="absolute top-6 right-6 bg-zinc-900 border border-white/10 text-white text-xs font-display px-4 py-2 uppercase tracking-widest z-10">
              Daily Rental Ready
            </div>
          )}
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] font-display text-zinc-600 font-bold">
              <span>{vehicle.make} &bull; {vehicle.year}</span>
              <span className="text-white">KES {vehicle.price_kes.toLocaleString()}</span>
            </div>
            <h3 className="text-2xl font-display text-white group-hover:text-white transition-colors uppercase tracking-widest italic leading-none">{vehicle.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-y-6 pt-8 border-t border-white/5">
            {[
              { icon: Gauge, value: `${vehicle.mileage} KM` },
              { icon: Zap, value: vehicle.transmission },
              { icon: Fuel, value: vehicle.fuel_type },
              { icon: Activity, value: vehicle.condition.toUpperCase() },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-zinc-700">
                <stat.icon className="w-4 h-4" />
                <span className="text-xs font-display uppercase tracking-widest leading-none font-bold group-hover:text-zinc-400 transition-colors">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
