"use client";

import { useState } from "react";
import Link from "next/link";
/* Stable Relative Imports for Level 3 Depth (src/app/(public)/checkout) */
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { MOCK_VEHICLES } from "../../../lib/mocks";
import { Receipt } from "../../../components/checkout/Receipt";
import { VehicleIcon } from "../../../components/vehicles/VehicleIcon";
import { 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Loader2,
  Lock,
  ArrowLeft
} from "lucide-react";
import { cn } from "../../../lib/utils";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const vehicle = MOCK_VEHICLES[0]; 
  const depositAmount = vehicle.price_kes * 0.1;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col pt-24 text-black">
        <Navbar />
        <main className="flex-grow py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-16 flex justify-between items-center no-print text-center">
               <h1 className="text-3xl font-display text-black uppercase tracking-widest leading-none mb-0">Transaction Finalized</h1>
               <Link href="/vehicles" className="text-zinc-500 hover:text-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 font-display">
                 <ArrowLeft className="w-4 h-4" /> Back to Fleet
               </Link>
            </div>
            <div className="border border-black/10 shadow-2xl">
              <Receipt 
                orderId="IOM-TXN-9821-X"
                vehicle={{ title: vehicle.title, price: vehicle.price_kes, deposit: depositAmount }}
                customer={{ name: "Valued Client", email: "client@example.com", phone: "+254 700 000 000" }}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3 space-y-12">
            <h1 className="text-5xl md:text-6xl font-display uppercase tracking-widest leading-tight">Complete Acquisition</h1>

            <section className="space-y-8">
              <h2 className="text-xs font-display text-zinc-600 uppercase tracking-[0.4em] border-b border-white/5 pb-6">Payment Instrument Selection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "relative p-8 border text-left transition-all overflow-hidden",
                    paymentMethod === "card" ? "border-white bg-zinc-900" : "border-white/5 hover:border-white/20"
                  )}
                >
                  <CreditCard className={cn("w-8 h-8 mb-6", paymentMethod === "card" ? "text-white" : "text-zinc-700")} />
                  <div className="font-display uppercase tracking-widest text-lg mb-1">Electronic Card</div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest leading-none">Visa, Mastercard, AMEX</div>
                </button>

                <button 
                  onClick={() => setPaymentMethod("mpesa")}
                  className={cn(
                    "relative p-8 border text-left transition-all overflow-hidden",
                    paymentMethod === "mpesa" ? "border-white bg-zinc-900" : "border-white/5 hover:border-white/20"
                  )}
                >
                  <Smartphone className={cn("w-8 h-8 mb-6", paymentMethod === "mpesa" ? "text-white" : "text-zinc-700")} />
                  <div className="font-display uppercase tracking-widest text-lg mb-1">M-Pesa Direct</div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest leading-none">Instant Network Settle</div>
                </button>
              </div>
            </section>
          </div>

          <aside className="lg:w-1/3">
            <div className="sticky top-32 bg-zinc-900 border border-white/10 p-10 space-y-10 shadow-2xl">
              <h3 className="text-lg font-display uppercase tracking-widest text-white border-b border-white/5 pb-6 leading-none">Transaction Breakdown</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-8 bg-black border border-white/5 flex items-center justify-center">
                       <VehicleIcon type={vehicle.type} className="w-5 h-5 text-zinc-800" />
                     </div>
                     <span className="text-sm uppercase tracking-widest text-zinc-400 font-display">{vehicle.title}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500 font-display">
                  <span>Asset Valuation</span>
                  <span className="text-white">KES {vehicle.price_kes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-display uppercase items-end pt-4 border-t border-white/5">
                  <span className="text-zinc-600 text-xs">Initial Deposit (10%)</span>
                  <span className="text-3xl text-white italic">KES {depositAmount.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="btn-gold !w-full !py-5 text-sm flex items-center justify-center gap-4 relative overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <> <Lock className="w-5 h-5" /> Execute Payment </>}
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
