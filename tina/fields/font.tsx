import React from 'react';

export const fontOptions = [
  { label: 'System Sans', value: 'sans', family: 'system-ui, -apple-system, sans-serif' },
  { label: 'Comfortaa', value: 'comfortaa', family: 'Comfortaa, cursive' },
  { label: 'Quicksand', value: 'quicksand', family: 'Quicksand, sans-serif' },
  { label: 'Nunito', value: 'nunito', family: 'Nunito, sans-serif' },
  { label: 'Josefin Sans', value: 'josefin-sans', family: 'Josefin Sans, sans-serif' },
  { label: 'Cormorant', value: 'cormorant', family: 'Cormorant, serif' },
  { label: 'Lora', value: 'lora', family: 'Lora, serif' },
  { label: 'Crimson Text', value: 'crimson-text', family: 'Crimson Text, serif' },
  { label: 'Playfair Display', value: 'playfair', family: 'Playfair Display, serif' },
  { label: 'Libre Baskerville', value: 'libre-baskerville', family: 'Libre Baskerville, serif' },
  { label: 'Karla', value: 'karla', family: 'Karla, sans-serif' },
  { label: 'Lexend', value: 'lexend', family: 'Lexend, sans-serif' },
  { label: 'Poppins', value: 'poppins', family: 'Poppins, sans-serif' },
  { label: 'Outfit', value: 'outfit', family: 'Outfit, sans-serif' },
  { label: 'Sofia Sans', value: 'sofia-sans', family: 'Sofia Sans, sans-serif' },
  { label: 'Manrope', value: 'manrope', family: 'Manrope, sans-serif' },
  { label: 'DM Sans', value: 'dm-sans', family: 'DM Sans, sans-serif' },
  { label: 'Jost', value: 'jost', family: 'Jost, sans-serif' },
  { label: 'Spectral', value: 'spectral', family: 'Spectral, serif' },
  { label: 'EB Garamond', value: 'eb-garamond', family: 'EB Garamond, serif' },
];

export const headingFontOptions = [
  { label: 'Same as body', value: 'inherit', family: 'inherit' },
  ...fontOptions,
];

export const FontPickerInput = (props: any) => {
  const options = props.field.name === 'headingFont' ? headingFontOptions : fontOptions;
  const currentValue = props.input.value || '';
  const currentFont = options.find(opt => opt.value === currentValue);
  const isHeadingFont = props.field.name === 'headingFont';

  return (
    <div className="flex flex-col gap-3">
      {/* Load Google Fonts dynamically */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Quicksand:wght@400;600;700&family=Nunito:wght@400;600;700&family=Josefin+Sans:wght@400;600;700&family=Cormorant:wght@400;600;700&family=Lora:wght@400;600;700&family=Crimson+Text:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Karla:wght@400;600;700&family=Lexend:wght@400;600;700&family=Poppins:wght@400;600;700&family=Outfit:wght@400;600;700&family=Sofia+Sans:wght@400;600;700&family=Manrope:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=Jost:wght@400;600;700&family=Spectral:wght@400;600;700&family=EB+Garamond:wght@400;600;700&display=swap"
      />

      {/* Simple dropdown selector */}
      <select
        value={currentValue}
        onChange={(e) => props.input.onChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-base font-medium"
        style={{ fontFamily: 'system-ui' }}
      >
        {!currentValue && <option value="">Selecteer een lettertype...</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Current selection live preview */}
      {currentFont && (
        <div 
          className="p-5 border-2 border-teal-500 rounded-xl bg-white shadow-md"
          style={{ fontFamily: currentFont.family }}
        >
          <div className="text-xs font-bold text-teal-700 uppercase mb-3" style={{ fontFamily: 'system-ui' }}>
            ✓ Live Voorbeeld
          </div>
          {isHeadingFont ? (
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">Welkom bij Ommer Oase</h1>
              <h2 className="text-2xl font-semibold">Ontspanning & Wellness</h2>
              <h3 className="text-xl font-medium">Behandelingen</h3>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-base">Dit is een voorbeeld van normale tekst op uw website. Zo ziet alle broodtekst eruit.</p>
              <p className="text-gray-600">Ook kleinere tekst zoals beschrijvingen gebruikt dit lettertype.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
