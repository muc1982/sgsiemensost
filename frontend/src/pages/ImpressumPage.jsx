export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="impressum-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl text-white">
            Impressum
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2 className="font-heading text-2xl text-white mb-4">Angaben gemäß § 5 TMG</h2>
            
            <div className="bg-jersey-texture rounded-lg border border-white/10 p-6 mb-8">
              <p className="text-slate-300 mb-2">
                <strong className="text-white">SG Siemens München Ost e.V.</strong>
              </p>
              <p className="text-slate-400">
                St.-Cajetan-Straße 33<br />
                81669 München<br />
                Deutschland
              </p>
            </div>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Vertreten durch</h2>
            <p className="text-slate-300 mb-8">
              1. Vorstand: Robert Steinhauser<br />
              2. Vorstand: André Schuster<br />
              3. Vorstand: Bernd Hochrein
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Kontakt</h2>
            <p className="text-slate-300 mb-8">
              E-Mail: info@sg-siemens-ost.de
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Registereintrag</h2>
            <p className="text-slate-300 mb-8">
              Eingetragen im Vereinsregister.<br />
              Registergericht: Amtsgericht München<br />
              Registernummer: VR [Nummer]
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Haftungsausschluss</h2>
            
            <h3 className="font-heading text-xl text-white mb-3 mt-6">Haftung für Inhalte</h3>
            <p className="text-slate-400 mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit 
              und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir 
              gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>

            <h3 className="font-heading text-xl text-white mb-3 mt-6">Haftung für Links</h3>
            <p className="text-slate-400 mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="font-heading text-xl text-white mb-3 mt-6">Urheberrecht</h3>
            <p className="text-slate-400">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
