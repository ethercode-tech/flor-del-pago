export function SiteFooter() {
  return (
    <footer className="mt-0 border-t border-[var(--line)]/60 bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-7 px-6 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-lg uppercase tracking-[0.06em] text-[var(--ink)]">Flor Del Pago</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Cocina Italo-Colonial en Lozano. Reservas limitadas con confirmacion automatica.
          </p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p>Jose Quintana 7, Lozano, Jujuy</p>
          <p>+54 388 513-4101</p>
          <p>Martes a Domingo</p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p>Instagram: @flordelpago.jujuy</p>
          <p>No delivery ni take-away</p>
          <p>Reservas con anticipacion</p>
        </div>
      </div>
    </footer>
  );
}
