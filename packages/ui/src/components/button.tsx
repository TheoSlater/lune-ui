"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@workspace/ui/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 transform-gpu items-center justify-center",
    "whitespace-nowrap rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium antialiased outline-none select-none",

    // Keep paint properties smooth; Motion owns the press transform.
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-(--motion-duration-fast)",
    "ease-(--motion-ease-standard)",

    // Focus
    "focus-visible:border-ring",
    "focus-visible:ring-3",
    "focus-visible:ring-ring/50",

    // Disabled / invalid
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-3",
    "aria-invalid:ring-destructive/20",

    // Icons
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",

    // Accessibility
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary",
          "text-primary-foreground",
          "shadow-xs",
          "hover:bg-primary/90",
          "hover:shadow-sm",
        ],

        secondary: [
          "bg-secondary",
          "text-secondary-foreground",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "aria-expanded:bg-accent",
          "aria-expanded:text-accent-foreground",
        ],

        outline: [
          "border-border",
          "bg-background",
          "text-foreground",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "aria-expanded:bg-accent",
          "aria-expanded:text-accent-foreground",
        ],

        ghost: [
          "text-foreground",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "aria-expanded:bg-accent",
          "aria-expanded:text-accent-foreground",
        ],

        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
          "hover:bg-destructive/90",
          "focus-visible:border-destructive",
          "focus-visible:ring-destructive/20",
        ],

        link: ["text-primary", "underline-offset-4", "hover:underline"],
      },

      size: {
        default: [
          "h-8",
          "gap-1.5",
          "px-2.5",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ],

        xs: [
          "h-6",
          "gap-1",
          "[&>span]:gap-1",
          "px-2",
          "text-xs",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3",
        ],

        sm: [
          "h-7",
          "gap-1",
          "[&>span]:gap-1",
          "px-2.5",
          "text-[0.8rem]",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ],

        lg: [
          "h-9",
          "gap-1.5",
          "px-2.5",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ],

        icon: "size-8",

        "icon-xs": [
          "size-6",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "[&_svg:not([class*='size-'])]:size-3",
        ],

        "icon-sm": [
          "size-7",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
        ],

        "icon-lg": "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  static: staticMotion = false,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    /** Disable press motion for controls where movement would distract. */
    static?: boolean;
  }) {
  const prefersReducedMotion = useReducedMotion();
  const isDisabled = disabled || loading;
  const isMotionDisabled = prefersReducedMotion || isDisabled || staticMotion;

  return (
    <ButtonPrimitive
      render={
        <motion.button
          whileTap={isMotionDisabled ? undefined : { scale: 0.96 }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
        />
      }
      data-slot="button"
      data-loading={loading ? "" : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <LoaderCircle
          aria-hidden="true"
          data-icon="inline-start"
          className="absolute size-4 animate-spin motion-reduce:animate-none"
        />
      )}
      <span
        className={cn(
          "inline-flex items-center gap-1.5",
          loading && "opacity-0",
        )}
      >
        {props.children}
      </span>
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
