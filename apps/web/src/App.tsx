import { useState } from "react";

import { componentRegistry } from "./component-registry";

export function App() {
  const [selectedKey, setSelectedKey] = useState(
    componentRegistry[0]?.key ?? "",
  );
  const selectedComponent = componentRegistry.find(
    (component) => component.key === selectedKey,
  );

  return (
    <main className="flex min-h-svh bg-muted/30 text-foreground">
      <aside className="sticky top-0 flex h-svh w-60 shrink-0 flex-col border-r border-border bg-background">
        <div className="border-b border-border px-5 py-5">
          <p className="text-sm font-semibold tracking-tight">Lune UI</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Component registry
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3" aria-label="Components">
          <p className="px-2 pb-2 text-[0.68rem] font-medium tracking-widest text-muted-foreground uppercase">
            Components
          </p>
          <div className="space-y-0.5">
            {componentRegistry.map((component) => {
              const isSelected = component.key === selectedKey;

              return (
                <button
                  key={component.key}
                  type="button"
                  aria-current={isSelected ? "page" : undefined}
                  className="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm outline-none transition-[color,background-color,box-shadow] duration-(--motion-duration-fast) ease-(--motion-ease-standard) hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/30 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground motion-reduce:transition-none"
                  data-selected={isSelected}
                  onClick={() => setSelectedKey(component.key)}
                >
                  {component.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">
            {componentRegistry.length} installed components
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Press <kbd className="font-mono">d</kbd> to toggle dark mode.
          </p>
        </div>
      </aside>

      <section className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-8 py-10">
          {selectedComponent ? (
            <>
              <header className="mb-8">
                <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Lune UI / Components
                </p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {selectedComponent.label}
                </h1>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  {selectedComponent.description}
                </p>
              </header>
              {selectedComponent.demo()}
            </>
          ) : (
            <div className="flex min-h-80 items-center justify-center text-sm text-muted-foreground">
              No components installed.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
