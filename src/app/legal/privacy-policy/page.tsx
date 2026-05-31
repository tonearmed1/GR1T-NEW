export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-black mt-10">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Datenschutzerklärung / Privacy Policy</h1>

        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">1. Verantwortlicher / Data Controller</h2>
            <div className="mt-3 text-black/80 leading-relaxed">
              <p>GR1T Motorcycles GmbH</p>
              <p>Goethestrasse 42, 10625 Berlin, Deutschland</p>
              <p>Handelsregister B des Amtsgerichts München, HRB 288034</p>
              <p>E-Mail: info@gritmotorcycles.com</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              2. Allgemeines zur Datenverarbeitung / General Information on Data Processing
            </h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Wir verarbeiten Ihre personenbezogenen Daten grundsätzlich nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              We process your personal data only to the extent necessary to provide a functional website and our content and
              services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              3. Datenkategorien, Zwecke und Rechtsgrundlagen / Data Categories, Purposes and Legal Basis
            </h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Wir verarbeiten folgende Daten: Name, E-Mail-Adresse, Land des Wohnsitzes, IP-Adresse, Zeitstempel der Anmeldung.
              Dies erfolgt zum Zwecke des Versands von Newslettern, zur Verbesserung unseres Angebots und zur Analyse
              geografischer Interessensverteilung. Rechtsgrundlage ist Ihre ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a
              DSGVO).
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              We process the following data: name, email address, country of residence, IP address, and time of registration. This
              is done to send newsletters, improve our offering, and analyze geographic interest distribution. The legal basis is
              your explicit consent (Art. 6 para. 1 lit. a GDPR).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">4. Speicherung der Daten / Data Retention</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Die Daten werden gespeichert, solange Ihre Einwilligung besteht oder bis Sie sich vom Newsletter abmelden. Danach
              werden sie unverzüglich gelöscht.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              Data will be stored as long as your consent is valid or until you unsubscribe from the newsletter. After that, the
              data will be deleted without delay.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. Weitergabe von Daten / Data Sharing</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Eine Übermittlung Ihrer Daten an Dritte erfolgt nicht ohne Ihre ausdrückliche Einwilligung. Wir nutzen
              vertrauenswürdige Dienstleister zur technischen Bereitstellung des Newsletters (z. B. Mailchimp oder ähnliche
              Anbieter mit Sitz in der EU oder angemessener Datenschutzvereinbarung).
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              Your data will not be shared with third parties without your explicit consent. We use trusted service providers for
              newsletter delivery (e.g., Mailchimp or similar providers located in the EU or with appropriate data protection
              agreements).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">6. Rechte der betroffenen Person / Rights of the Data Subject</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
              Widerspruch. Bitte wenden Sie sich dazu an grit@gritmotorcycles.com.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              You have the right to access, rectify, erase, restrict processing, data portability, and object. Please contact us
              at grit@gritmotorcycles.com.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">7. Widerruf der Einwilligung / Withdrawal of Consent</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              You may withdraw your consent at any time with effect for the future. The legality of the data processing carried
              out until the withdrawal remains unaffected.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">8. Beschwerderecht / Right to Lodge a Complaint</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig für uns ist das Bayerische
              Landesamt für Datenschutzaufsicht (BayLDA).
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              You have the right to lodge a complaint with a data protection supervisory authority. Our competent authority is the
              Bavarian Data Protection Authority (BayLDA).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
