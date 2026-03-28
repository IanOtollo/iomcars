"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  ArrowUpDown,
  ChevronDown
} from "lucide-react";
/* Precise Relative Imports for Level 3 Depth (src/app/(public)/vehicles) */
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { VehicleCard } from "../../../components/vehicles/VehicleCard";
import { MOCK_VEHICLES } from "../../../lib/mocks";
import { cn } from "../../../lib/utils";

function VehiclesContent() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type");

  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>(typeFilter || "all");
  const [sortBy, setSortBy] = useState("newest");

  const filterOptions = ["all", "sedan", "suv", "motorbike", "truck"];

  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.make.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || v.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />

      <main className="flex-grow">
        {/* Header Infrastructure */}
        <section className="bg-zinc-950 border-b border-white/5 py-12 md:py-20 overflow-hidden relative group">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-white/5 opacity-50" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-xs font-display text-zinc-600 uppercase tracking-[0.6em] mb-4">
                  Asset Bureau <div className="h-[1px] w-20 bg-white/5" />
                </div>
                <h1 className="text-6xl md:text-8xl font-display text-white uppercase tracking-tighter leading-none italic">
                  Inventory <span className="not-italic opacity-20">Portfolio</span>
                </h1>
                <p className="text-xs text-zinc-600 uppercase tracking-[0.4em] font-display italic">
                  Displaying {filteredVehicles.length} Certified Assets
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Console */}
        <section className="sticky top-20 z-30 bg-black/80 backdrop-blur-2xl border-b border-white/5 py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="flex bg-zinc-900 border border-white/5 p-1 items-center">
                {filterOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "px-6 py-2 text-xs font-display uppercase tracking-widest transition-all italic font-bold",
                      selectedType === type ? "bg-white text-black" : "text-zinc-600 hover:text-white"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                <input 
                  type="text"
                  placeholder="Filter by Make/Model"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 pl-12 pr-4 py-3 text-xs md:text-sm font-display uppercase tracking-widest text-white focus:border-white transition-all outline-none italic"
                />
              </div>
              <div className="flex border border-white/5 bg-zinc-900 overflow-hidden shadow-2xl">
                 <button 
                  onClick={() => setView("grid")}
                  className={cn("p-3 transition-colors", view === "grid" ? "bg-white text-black" : "text-zinc-600 hover:text-white hover:bg-zinc-800")}
                 >
                   <Grid className="w-4 h-4" />
                 </button>
                 <button 
                  onClick={() => setView("list")}
                  className={cn("p-3 transition-colors border-l border-white/5", view === "list" ? "bg-white text-black" : "text-zinc-600 hover:text-white hover:bg-zinc-800")}
                 >
                   <List className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Asset Grid */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            {filteredVehicles.length > 0 ? (
              <div className={cn(
                "grid gap-12",
                view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} view={view} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 border border-white/5 bg-zinc-900/40">
                <div className="text-xs font-display text-zinc-700 uppercase tracking-[0.8em] mb-4">Zero Matches Found</div>
                <h3 className="text-2xl font-display text-white italic uppercase tracking-widest">Bureau Record Empty</h3>
                <button 
                  onClick={() => {setSelectedType("all"); setSearchQuery("");}}
                  className="mt-10 text-xs text-white uppercase tracking-[0.4em] font-display hover:opacity-100 transition-opacity flex items-center gap-4 mx-auto border-b border-white"
                >
                  Reset Inventory Bureau
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
        <div className="text-xs font-display text-zinc-600 tracking-[0.6em] uppercase block animate-pulse">Initializing Bureau</div>
        <div className="text-xl font-display tracking-widest uppercase italic">Loading Assets...</div>
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}
