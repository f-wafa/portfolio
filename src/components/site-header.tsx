import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          aria-label="Faiz Syaiful Wafa, back to top"
          className="inline-flex min-h-11 items-center text-xl font-semibold tracking-[-0.04em]"
        >
          faiz<span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-sm px-1.5 text-[0.8125rem] font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:text-sm"
            >
              {item.label}
            </a>
          ))}
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line sm:block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
