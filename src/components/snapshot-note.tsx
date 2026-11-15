export function SnapshotNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-line bg-surface px-4 py-3">
      <p className="text-sm leading-relaxed text-muted">
        <span className="font-medium text-ink">Snapshot.</span> {children}
      </p>
    </div>
  );
}
