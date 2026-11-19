export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] text-muted">
      <span className="text-accent">{index}</span>
      <span aria-hidden="true" className="text-muted/50">
        /
      </span>
      <span>{children}</span>
    </p>
  );
}
