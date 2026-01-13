"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

const sehirler = ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya", "Konya", "Gaziantep"];

export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Istanbul");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trTarih, setTrTarih] = useState("");

  useEffect(() => {
    const bugun = new Date();
    setTrTarih(bugun.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));

    async function getVakitler() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Turkey&method=13`);
        if (!res.ok) throw new Error("Veri çekilemedi");
        const result = await res.json();
        setData(result.data.timings);
      } catch (err) {
        setError("Vakitler şu an alınamıyor. Lütfen internetinizi kontrol edin.");
      } finally {
        setLoading(false);
      }
    }
    getVakitler();
  }, [city]);

  return (
    <div style={{ width: '100%', maxWidth: '1000px', padding: '20px' }}>
      {/* Header Bileşeni */}
      <Header trTarih={trTarih} />
      
      {/* Content Bileşeni */}
      <Content 
        data={data} 
        loading={loading} 
        error={error} 
        city={city} 
        setCity={setCity} 
        sehirler={sehirler} 
      />
      
      {/* Footer Bileşeni */}
      <Footer isim="Yunus Emre Demirtaş" />
    </div>
  );
}
