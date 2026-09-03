import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-background px-2.5 py-2 text-sm text-foreground shadow-xs outline-none",
        "placeholder:text-muted-foreground",
        "transition-[color,background-color,border-color,box-shadow,opacity]",
        "duration-(--motion-duration-fast) ease-(--motion-ease-standard)",
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

export { Textarea };
