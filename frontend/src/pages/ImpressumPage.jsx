import { BackButton } from "@/components/Layout";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="impressum-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="font-heading text-4xl md:text-5xl text-white">
              Impressum
            </h1>
            <BackButton />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="prose prose-invert prose-slate max-w-none">

            {/* Angaben */}
            <div className="bg-jersey-texture rounded-lg border border-white/10 p-6 mb-8">
              <p className="text-slate-300 mb-2">
                <strong className="text-white text-xl font-heading">Sportgemeinschaft Siemens München Ost e.V.</strong>
              </p>
              <p className="text-slate-400">
                St.-Cajetan-Straße 33<br />
                81669 München
              </p>
            </div>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Vertreten durch:</h2>
            <p className="text-slate-300 mb-8">
              Sportgemeinschaft Siemens München Ost e.V.
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Kontakt</h2>
            <div className="bg-jersey-texture rounded-lg border border-white/10 p-6 mb-8">
              <p className="text-slate-400">
                Telefon: +49 (0) 89 4026-8600<br />
                Telefax: +49 (0) 89 4026-9028<br />
                E-Mail: <a href="mailto:info@sgsiemensost-fussball.de" className="text-electric-royal hover:text-cyber-gold">info@sgsiemensost-fussball.de</a>
              </p>
            </div>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Redaktionell verantwortlich</h2>
            <p className="text-slate-300 mb-8">
              Sportgemeinschaft Siemens München Ost e.V.<br />
              St.-Cajetan-Straße 33<br />
              81669 München
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="text-slate-400 mb-8">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            {/* Quelle */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-electric-royal hover:text-cyber-gold">eRecht24</a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
