import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-shell flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <div className="glass-card rounded-3xl px-10 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted">404</p>
        <h1 className="mt-4 font-heading text-4xl text-text">Page not found</h1>
        <p className="mt-3 text-sm text-muted">The page you are looking for does not exist or moved.</p>
        <Link href="/" className="mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-text">
          Back to home
        </Link>
      </div>
    </div>
  );
}
