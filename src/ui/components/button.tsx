import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--gold)] text-black hover:bg-[var(--gold-hover)]",
        secondary: "bg-white text-black hover:bg-zinc-200",
        ghost:
          "bg-transparent text-white border border-white/50 hover:bg-[#1EAEDB]/70 hover:border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
