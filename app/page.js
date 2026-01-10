"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [vakitler, setVakitler] = useState(null);
  const [sehir, setSehir] = useState('Istanbul');

  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${sehir}&country=Turkey&method=13`)
      .then(res => res.json())
      .then(data => setVakitler(data.data.timings));
  }, [sehir]);

  if (!vakitler) return <div className="p-10 text-center">Yükleniyor...</div>;

  return (
    <main className="flex flex-col items-center p-10 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{sehir} Namaz Vakitleri</h1>
      
      {/* Şehir Seçme Alanı */}
      <input 
        className="p-2 border rounded mb-5 text-black"
        type="text" 
        placeholder="Şehir giriniz..." 
        onBlur={(e) => setSehir(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {Object.entries(vakitler).map(([key, val]) => (
          // Sadece ana vakitleri göstermek için filtreleme yapabilirsin
          ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(key) && (
            <div key={key} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-gray-500 uppercase text-sm">{key}</h2>
              <p className="text-2xl font-bold text-blue-600">{val}</p>
            </div>
          )
        ))}
      </div>
    </main>
  );
}
