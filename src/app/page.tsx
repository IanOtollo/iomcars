"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRightLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VehicleIcon } from "@/components/vehicles/VehicleIcon";
import { MOCK_VEHICLES } from "@/lib/mocks";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = MOCK_VEHICLES.slice(0, 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2500); // Accelerated from 4s to 2.5s
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main>
        {/* Cinematic Hero Slideshow */}
        <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />
              <img 
                src={heroSlides[currentSlide].images[0]} 
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hero Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 pt-24 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <span className="text-[10px] sm:text-xs font-display tracking-[0.5em] uppercase text-zinc-400 block">
                The Standard of Automotive Excellence
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-display leading-[0.8] tracking-widest uppercase mb-0 italic">
                Define Your <br />
                <span className="text-white bg-white/5 px-6 md:px-8 ml-[-2rem] inline-block not-italic">Legacy</span>
              </h1>
            </motion.div>


            
            <div className="flex justify-center flex-wrap gap-8 md:gap-16 pt-12">
               {[
                 { label: "Assets Sold", value: "2.4k+" },
                 { label: "Verified Dealers", value: "48" },
                 { label: "Elite Members", value: "12k" },
               ].map((stat) => (
                 <div key={stat.label} className="text-center group min-w-[100px]">
                    <div className="text-xl md:text-3xl font-display text-white group-hover:scale-110 transition-transform italic">{stat.value}</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1 font-display font-bold">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Slide Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {heroSlides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "h-1 transition-all duration-500",
                  currentSlide === idx ? "w-12 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </section>

        {/* Brand Legacy Marquee */}
        <section className="py-8 border-b border-white/5 bg-black overflow-hidden flex whitespace-nowrap relative">
          <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex items-center gap-16 md:gap-32 w-max px-8"
          >
             {[
               "Porsche", "Mercedes-Benz", "Bentley", "Ducati", "Land Rover", "Scania", "BMW", "Volvo", "Kawasaki", "Audi",
               "Porsche", "Mercedes-Benz", "Bentley", "Ducati", "Land Rover", "Scania", "BMW", "Volvo", "Kawasaki", "Audi"
             ].map((brand, idx) => (
                <span key={idx} className="text-sm md:text-lg font-display font-bold uppercase tracking-[0.4em] text-zinc-700 italic flex items-center gap-4">
                  {brand}
                  <div className="w-1.5 h-1.5 bg-zinc-800 rotate-45" />
                </span>
             ))}
          </motion.div>
        </section>

        {/* Global Category Grid */}
        <section className="py-24 bg-zinc-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-32">
              {[
                { label: "Luxury Sedans", type: "sedan" },
                { label: "Elite SUVs", type: "suv" },
                { label: "Sport Bikes", type: "motorbike" },
                { label: "Heavy Duty", type: "truck" },
                { label: "Rental Fleet", type: "sedan" },
                { label: "Track Performance", type: "motorbike" },
              ].map((cat, idx) => (
                <Link href={"/vehicles?type=" + cat.type} key={idx} className="group cursor-pointer bg-zinc-900/40 border border-white/5 p-10 text-center hover:border-white transition-all shadow-xl">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center mx-auto mb-8 text-zinc-700 group-hover:bg-white group-hover:text-black transition-all">
                    <VehicleIcon type={cat.type} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs text-white font-display tracking-[0.3em] uppercase leading-none italic opacity-60 group-hover:opacity-100 transition-opacity font-bold">{cat.label}</h3>
                </Link>
              ))}
            </div>

            {/* Strategic Partnerships Section */}
            <div className="space-y-20">
               <div className="text-center space-y-4">
                 <span className="text-xs font-display text-zinc-600 tracking-[0.6em] uppercase block">Global Network</span>
                 <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest italic text-white leading-none">Strategic Ecosystem</h2>
                 <div className="h-[1px] w-40 bg-white/5 mx-auto mt-8" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="p-12 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all space-y-10 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-xs font-display text-zinc-500 tracking-widest uppercase border-b border-white/5 pb-4 font-bold">Energy Performance</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <div>
                           <span className="text-base font-display uppercase tracking-widest text-white italic">Shell V-Power</span>
                           <span className="text-[10px] text-zinc-700 uppercase tracking-widest block mt-1">Efficiency Partner</span>
                        </div>
                        <Globe className="w-5 h-5 text-zinc-800" />
                      </div>
                    </div>
                  </div>

                  <div className="p-12 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all space-y-10 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-xs font-display text-zinc-500 tracking-widest uppercase border-b border-white/5 pb-4 font-bold">Global Logistics</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <div>
                           <span className="text-base font-display uppercase tracking-widest text-white italic">Skyward Direct</span>
                           <span className="text-[10px] text-zinc-700 uppercase tracking-widest block mt-1">Air Freight Dispatch</span>
                        </div>
                        <Globe className="w-5 h-5 text-zinc-800" />
                      </div>
                    </div>
                  </div>

                  <div className="p-12 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all space-y-10 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-xs font-display text-zinc-500 tracking-widest uppercase border-b border-white/5 pb-4 font-bold">Technical Bureau</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <div>
                           <span className="text-base font-display uppercase tracking-widest text-white italic">M-Power Garage</span>
                           <span className="text-[10px] text-zinc-700 uppercase tracking-widest block mt-1">Specialized Maintenance</span>
                        </div>
                        <Globe className="w-5 h-5 text-zinc-800" />
                      </div>
                    </div>
                  </div>
               </div>

               {/* Ecosystem Partners Marquee */}
               <div className="pt-10 overflow-hidden flex whitespace-nowrap relative border-t border-white/5 mt-10">
                 <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10" />
                 <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10" />
                 
                 <motion.div 
                   animate={{ x: ["0%", "-50%"] }}
                   transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                   className="flex items-center gap-16 md:gap-32 w-max px-8"
                 >
                    {[
                      "Shell V-Power", "Skyward Direct", "M-Power Garage", "Brembo Racing", "Pirelli P-Zero", "Ohlines", "Akrapovič", "Mobil 1",
                      "Shell V-Power", "Skyward Direct", "M-Power Garage", "Brembo Racing", "Pirelli P-Zero", "Ohlines", "Akrapovič", "Mobil 1"
                    ].map((partner, idx) => (
                       <span key={idx} className="text-xs md:text-sm font-display font-bold uppercase tracking-[0.4em] text-zinc-600 italic flex items-center gap-4">
                         {partner}
                         <div className="w-1 h-1 bg-zinc-800 rotate-45" />
                       </span>
                    ))}
                 </motion.div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Call to Action Search Protocol */}
      <section className="py-32 bg-black border-t border-white/5 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_50%)] from-white/5 opacity-50" />
        <div className="relative z-10 w-full max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-display text-zinc-600 tracking-[0.6em] uppercase block">Acquisition Protocol</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest italic text-white leading-none">Locate Your Legacy</h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="bg-zinc-900 border border-white/10 p-1.5 flex flex-col md:flex-row items-center gap-1 shadow-2xl ring-1 ring-white/5">
              <div className="flex-grow flex items-center px-4 gap-4 w-full">
                <Search className="w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search Make or Model..." 
                  className="w-full bg-transparent border-none py-4 text-xs md:text-sm font-body focus:ring-0 outline-none placeholder:text-zinc-700 uppercase tracking-widest text-white"
                />
              </div>
              <Link href="/vehicles" className="btn-gold !px-10 !py-5 w-full md:w-auto text-xs font-bold">
                 Locate Asset
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
