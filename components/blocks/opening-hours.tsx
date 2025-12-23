import React from 'react';

export default function OpeningHours() {
  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-lg flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-emerald-800">Openingstijden & Reserveren</h2>
          <p className="mt-1 text-emerald-700">Behandelingen alleen op afspraak — online te boeken of via e-mail.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border border-emerald-100 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-600">Reguliere dagen</h3>
              <p className="mt-2">Dinsdag t/m Zaterdag<br/><strong>10:00 – 17:00</strong></p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-emerald-100 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-600">Afspraken</h3>
              <p className="mt-2">Behandelingen alleen op afspraak. Vol = Vol. Tijdens behandelingen is de deur gesloten.</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-emerald-100 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-600">Vakantiesluiting</h3>
              <p className="mt-2">4 t/m 12 juli 2025<br/>23 t/m 28 september 2025</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="https://inschrijvenbijommerland.nl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700">Reserveer nu</a>
            <a href="mailto:info@ommeroase.nl" className="inline-flex items-center justify-center px-5 py-3 border border-emerald-200 rounded-lg text-emerald-700 hover:bg-emerald-50">Stel een vraag</a>
          </div>

          <div className="mt-4 text-sm text-emerald-600">
            <strong>Tip:</strong> Voor afspraken tijdens schoolvakanties raden we aan tijdig te reserveren.
          </div>
        </div>
      </div>
    </section>
  );
}
