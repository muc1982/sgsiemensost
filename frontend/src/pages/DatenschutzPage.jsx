export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="datenschutz-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl text-white">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="prose prose-invert prose-slate max-w-none">
            
            <h2 className="font-heading text-2xl text-white mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="font-heading text-xl text-white mb-3 mt-6">Allgemeine Hinweise</h3>
            <p className="text-slate-400 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">2. Datenerfassung auf unserer Website</h2>
            
            <h3 className="font-heading text-xl text-white mb-3 mt-6">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p className="text-slate-400 mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h3 className="font-heading text-xl text-white mb-3 mt-6">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-slate-400 mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
              z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch 
              beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten 
              (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <h3 className="font-heading text-xl text-white mb-3 mt-6">Wofür nutzen wir Ihre Daten?</h3>
            <p className="text-slate-400 mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h3 className="font-heading text-xl text-white mb-3 mt-6">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p className="text-slate-400 mb-4">
              Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, 
              Sperrung oder Löschung dieser Daten zu verlangen.
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">3. Kontaktformular</h2>
            <p className="text-slate-400 mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der 
              Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht 
              ohne Ihre Einwilligung weiter.
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">4. Externe Links</h2>
            <p className="text-slate-400 mb-4">
              Diese Website enthält Links zu externen Websites (z.B. Instagram). Für den Datenschutz auf 
              diesen externen Seiten sind deren Betreiber verantwortlich. Bitte informieren Sie sich dort 
              über deren Datenschutzbestimmungen.
            </p>

            <h2 className="font-heading text-2xl text-white mb-4 mt-8">5. Ihre Rechte</h2>
            <p className="text-slate-400 mb-4">
              Sie haben das Recht:
            </p>
            <ul className="text-slate-400 list-disc pl-6 mb-4">
              <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten</li>
              <li>Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Löschung Ihrer Daten zu verlangen</li>
              <li>Die Einschränkung der Verarbeitung zu verlangen</li>
              <li>Der Verarbeitung zu widersprechen</li>
              <li>Ihre Daten in einem übertragbaren Format zu erhalten</li>
            </ul>

            <div className="bg-jersey-texture rounded-lg border border-white/10 p-6 mt-8">
              <h3 className="font-heading text-xl text-white mb-3">Kontakt für Datenschutzanfragen</h3>
              <p className="text-slate-400">
                SG Siemens München Ost e.V.<br />
                St.-Cajetan-Straße 33<br />
                81669 München<br />
                E-Mail: datenschutz@sg-siemens-ost.de
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
