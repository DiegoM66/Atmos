export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-body text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AtmosSequence. All rights reserved.
        </p>
        <p className="mt-2 font-body text-xs text-muted-foreground/70">A conceptual design for a luxury retreat.</p>
      </div>
    </footer>
  );
}
