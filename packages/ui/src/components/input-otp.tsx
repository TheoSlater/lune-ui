import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@workspace/ui/lib/utils";
import { MinusIcon } from "lucide-react";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:cursor-not-allowed has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn(
        "text-foreground disabled:pointer-events-none disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-1 has-aria-invalid:ring-destructive/15",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 items-center justify-center border-y border-r border-input bg-background text-sm text-foreground shadow-xs outline-none",
        "transition-[color,background-color,border-color,box-shadow,opacity] duration-(--motion-duration-fast) ease-(--motion-ease-standard)",
        "first:rounded-l-lg first:border-l last:rounded-r-lg",
        "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/15",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:bg-accent",
        "data-[active=true]:ring-2 data-[active=true]:ring-ring/30",
        "data-[active=true]:aria-invalid:border-destructive",
        "data-[active=true]:aria-invalid:ring-1 data-[active=true]:aria-invalid:ring-destructive/15",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-(--motion-duration-slow) motion-reduce:animate-none" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
