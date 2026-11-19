import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="-mx-2 inline-flex min-h-11 items-center px-2 text-xl font-semibold tracking-[-0.04em]"
        >
          faiz<span className="text-accent">.</span>
          <span className="sr-only">
            , Faiz Syaiful Wafa, back to top
          </span>
        </a>

        <div className="flex items-center">
          <SiteNav />
        </div>
      </div>
    </header>
  );
}
