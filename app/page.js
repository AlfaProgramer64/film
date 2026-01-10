"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Istanbul");

  useEffect(() => {
    async function getVakitler() {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Turkey&method=13`);
      const result = await res.json();
      setData(result.data.timings);
    }
    getVakitler();
  }, [city]);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{city} İçin Namaz Vakitleri</h1>
      <select onChange={(e) => setCity(e.target.value)} value={city}>
        <option value="Istanbul">İstanbul</option>
        <option value="Ankara">Ankara</option>
        <option value="Izmir">İzmir</option>
      </select>

      {data ? (
        <div style={{ marginTop: '20px' }}>
          <p>İmsak: {data.Fajr}</p>
          <p>Öğle: {data.Dhuhr}</p>
          <p>İkindi: {data.Asr}</p>
          <p>Akşam: {data.Maghrib}</p>
          <p>Yatsı: {data.Isha}</p>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </main>
  );
}
