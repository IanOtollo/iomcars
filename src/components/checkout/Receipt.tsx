"use client";

import { CheckCircle2, ShieldCheck, Printer, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReceiptProps {
  orderId: string;
  vehicle: {
    title: string;
    price: number;
    deposit: number;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export function Receipt({ orderId, vehicle, customer }: ReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 bg-white text-black font-body overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-16 border-b-2 border-black pb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-display text-gold tracking-tighter">IOM</span>
            <span className="text-3xl font-display text-black tracking-tighter">CARS</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-body max-w-xs">
            Elite Automotive Marketplace & Showroom. Nairobi, Kenya.
          </p>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-display uppercase tracking-widest mb-1">Receipt / Agreement</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-4">NO: {orderId}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest bg-gold/10 inline-block px-3 py-1">Type: Vehicle Reservation</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        {/* Customer Information */}
        <div className="space-y-6">
          <h2 className="text-xs font-display uppercase tracking-[0.3em] border-b border-gray-100 pb-2">1. Client Information</h2>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">Full Name</div>
              <div className="text-sm font-display text-black uppercase">{customer.name}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">Email Address</div>
              <div className="text-xs font-mono">{customer.email}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">Phone Number</div>
              <div className="text-xs">{customer.phone}</div>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-6">
          <h2 className="text-xs font-display uppercase tracking-[0.3em] border-b border-gray-100 pb-2">2. Asset Details</h2>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">Vehicle Selected</div>
              <div className="text-sm font-display text-black uppercase">{vehicle.title}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Negotiated Price</div>
                <div className="text-sm font-display text-black uppercase">KES {vehicle.price.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Deposit Paid</div>
                <div className="text-sm font-display text-gold uppercase underline decoration-gold/30">KES {vehicle.deposit.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Terms */}
      <div className="bg-gray-50 p-8 border-l-4 border-gold mb-16">
        <h3 className="text-[10px] font-display uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold" /> Terms of Reservation
        </h3>
        <ul className="space-y-2 text-[9px] text-gray-500 uppercase tracking-tighter leading-relaxed italic">
          <li>1. This deposit reserves the vehicle exclusively for the client for 48 hours.</li>
          <li>2. Reservation deposit is fully refundable within 7 days if purchase does not proceed.</li>
          <li>3. Total balance to be settled via bank transfer or financing partners within 3 business days.</li>
        </ul>
      </div>

      {/* Footer Branding */}
      <div className="text-center pt-8 border-t border-black/10">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.5em] mb-4">Certified Transaction &bull; IOMCars Quality Control</p>
        <div className="flex justify-center gap-8 no-print">
          <button onClick={handlePrint} className="flex items-center gap-2 text-gold hover:text-black transition-colors text-[10px] font-display uppercase border border-gold px-6 py-2">
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
          <button className="flex items-center gap-2 bg-black text-white hover:bg-gold hover:text-black transition-colors text-[10px] font-display uppercase px-6 py-2">
            <Download className="w-4 h-4" /> Download Agreement
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
