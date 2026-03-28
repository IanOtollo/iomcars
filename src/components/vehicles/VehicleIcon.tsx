"use client";

import { Car, Truck, Bike, Bus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleIconProps {
  type: string;
  className?: string;
}

export function VehicleIcon({ type, className }: VehicleIconProps) {
  const t = type.toLowerCase();
  
  if (t.includes("sedan") || t.includes("car")) return <Car className={className} />;
  if (t.includes("suv") || t.includes("truck") || t.includes("heavy")) return <Truck className={className} />;
  if (t.includes("bike") || t.includes("moto")) return <Bike className={className} />;
  if (t.includes("bus")) return <Bus className={className} />;
  
  return <Car className={className} />;
}
