import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@workspace/ui/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground shadow-xs outline-none",
        "placeholder:text-muted-foreground",
        "transition-[color,background-color,border-color,box-shadow,opacity]",
        "duration-(--motion-duration-fast) ease-(--motion-ease-standard)",
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:shadow-sm focus-visible:outline-0",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/15",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
