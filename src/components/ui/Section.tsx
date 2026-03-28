import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: "light" | "dark" | "gold";
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  variant = "light",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 px-4 sm:px-6 lg:px-8",
        variant === "dark" && "bg-black text-white",
        variant === "gold" && "bg-gold text-black",
        className
      )}
    >
      <div className={cn("max-w-7xl mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
