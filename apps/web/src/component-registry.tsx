/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";

type ComponentDemo = () => ReactNode;

type ComponentModule = Record<string, unknown>;

const installedComponents = import.meta.glob<ComponentModule>(
  "../../../packages/ui/src/components/*.tsx",
  { eager: true },
);

const componentInfo: Record<
  string,
  { label: string; description: string; demo: ComponentDemo }
> = {
  button: {
    label: "Button",
    description: "Compact actions for toolbars, forms, and workflows.",
    demo: ButtonDemo,
  },
  dialog: {
    label: "Dialog",
    description: "Focused overlays for confirmation and short tasks.",
    demo: DialogDemo,
  },
  input: {
    label: "Input",
    description: "Single-line fields for dense desktop interfaces.",
    demo: InputDemo,
  },
  "input-group": {
    label: "Input Group",
    description: "Inputs composed with labels, actions, and addons.",
    demo: InputGroupDemo,
  },
  "input-otp": {
    label: "Input OTP",
    description: "Short, segmented verification code entry.",
    demo: InputOTPDemo,
  },
  textarea: {
    label: "Textarea",
    description: "Multiline text entry with the same calm field language.",
    demo: TextareaDemo,
  },
};

function componentKey(path: string) {
  return (
    path
      .split("/")
      .pop()
      ?.replace(/\.tsx$/, "") ?? path
  );
}

function UnknownDemo({ name }: { name: string }) {
  return (
    <DemoPanel title="Preview unavailable">
      <p className="text-sm text-muted-foreground">
        {name} is installed and registered. Add a focused showcase for it here
        when its interaction states are defined.
      </p>
    </DemoPanel>
  );
}

export const componentRegistry = Object.keys(installedComponents)
  .map((path) => {
    const key = componentKey(path);
    const info = componentInfo[key];

    return {
      key,
      label: info?.label ?? key,
      description: info?.description ?? "Installed Lune UI component.",
      demo: info?.demo ?? (() => <UnknownDemo name={key} />),
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

function DemoPanel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-background">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-medium">{title}</h2>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 p-5">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex w-full max-w-sm flex-col gap-1.5 text-xs font-medium">
      {label}
      {children}
    </label>
  );
}

function ButtonDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <DemoPanel title="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </DemoPanel>
      <DemoPanel title="Sizes and states">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
        <Button aria-invalid>Invalid</Button>
      </DemoPanel>
      <DemoPanel title="Icons">
        <Button>
          <Plus data-icon="inline-start" />
          New item
        </Button>
        <Button variant="outline">
          Settings
          <Settings data-icon="inline-end" />
        </Button>
        <Button variant="secondary">
          Continue
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button variant="destructive">
          <Trash2 data-icon="inline-start" />
          Delete
        </Button>
      </DemoPanel>
      <DemoPanel title="Icon sizes">
        <Button size="icon-xs" aria-label="Confirm">
          <Check />
        </Button>
        <Button size="icon-sm" variant="secondary" aria-label="Add">
          <Plus />
        </Button>
        <Button size="icon" variant="outline" aria-label="Settings">
          <Settings />
        </Button>
        <Button size="icon-lg" variant="ghost" aria-label="Delete">
          <Trash2 />
        </Button>
      </DemoPanel>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <DemoPanel title="Field states">
        <Field label="Placeholder">
          <Input placeholder="Search conversations" />
        </Field>
        <Field label="Filled">
          <Input defaultValue="gpt-5" />
        </Field>
        <Field label="Disabled">
          <Input defaultValue="Unavailable" disabled />
        </Field>
        <Field label="Invalid">
          <Input defaultValue="not-an-email" aria-invalid />
          <span className="text-xs font-normal text-destructive">
            Enter a valid email address.
          </span>
        </Field>
      </DemoPanel>
      <DemoPanel title="Types">
        <Field label="Password">
          <Input type="password" placeholder="Enter password" />
        </Field>
        <Field label="Email">
          <Input type="email" placeholder="you@example.com" />
        </Field>
        <Field label="Search">
          <Input type="search" placeholder="Search models" />
        </Field>
        <Field label="File">
          <Input type="file" />
        </Field>
      </DemoPanel>
      <DemoPanel title="Action row">
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input placeholder="Ask anything" />
          <Button>Send</Button>
        </div>
      </DemoPanel>
    </div>
  );
}

function InputGroupDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <DemoPanel title="Addons and actions">
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search models" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Settings">
              <Settings />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </DemoPanel>
      <DemoPanel title="States">
        <InputGroup className="max-w-sm">
          <InputGroupInput defaultValue="Disabled group" disabled />
        </InputGroup>
        <InputGroup className="max-w-sm">
          <InputGroupInput defaultValue="Invalid group" aria-invalid />
        </InputGroup>
      </DemoPanel>
    </div>
  );
}

function InputOTPDemo() {
  return (
    <DemoPanel
      title="Verification code"
      description="A compact segmented field for short codes."
    >
      <InputOTP maxLength={6} aria-label="Verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <InputOTP maxLength={6} disabled aria-label="Disabled verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </DemoPanel>
  );
}

function TextareaDemo() {
  return (
    <DemoPanel title="Multiline field">
      <Field label="Prompt">
        <Textarea placeholder="Describe what you want to build..." />
      </Field>
      <Field label="Filled">
        <Textarea defaultValue="A compact multiline field for desktop workflows." />
      </Field>
      <Field label="Disabled">
        <Textarea defaultValue="Unavailable" disabled />
      </Field>
      <Field label="Invalid">
        <Textarea defaultValue="Needs attention" aria-invalid />
      </Field>
    </DemoPanel>
  );
}

function DialogDemo() {
  return (
    <DemoPanel
      title="Overlay"
      description="Dialog is registered automatically from the shared component directory."
    >
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete workspace?</DialogTitle>
            <DialogDescription>
              This is a focused confirmation surface for a short, consequential
              action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete workspace</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DemoPanel>
  );
}
