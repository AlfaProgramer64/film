"use client";
import { useState, useEffect } from "react";

const sehirler = [
  "Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya", "Konya", "Gaziantep", "Sanliurfa", "Kocaeli",
  "Mersin", "Diyarbakir", "Hatay", "Manisa", "Kayseri", "Samsun", "Balikesir", "Kahramanmaras", "Van", "Aydin"
];

export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Istanbul");
  const [trTarih, setTrTarih] = useState("");

  useEffect(() => {
  
    const bugun = new Date();
    const formatliTarih = bugun.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setTrTarih(formatliTarih);

    async function getVakitler() {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Turkey&method=13`);
        const result = await res.json();
        setData(result.data.timings);
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    }
    getVakitler();
  }, [city]);

  return (
    <div style={{ width: '100%', maxWidth: '1000px', padding: '20px' }}>
      
      {/* Üst Bölüm */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '5px', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NAMAZ VAKİTLERİ
        </h1>
        <p style={{ color: '#fbbf24', fontSize: '1.3rem', fontWeight: '400', marginBottom: '30px' }}>{trTarih}</p>
        
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          {sehirler.map((s) => (
            <option key={s} value={s}>{s.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Vakit Kartları */}
      {data ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px'
        }}>
          <VakitKart isim="İMSAK" saat={data.Fajr} ikon="🌙" />
          <VakitKart isim="GÜNEŞ" saat={data.Sunrise} ikon="☀️" />
          <VakitKart isim="ÖĞLE" saat={data.Dhuhr} ikon="🏙️" />
          <VakitKart isim="İKİNDİ" saat={data.Asr} ikon="🌇" />
          <VakitKart isim="AKŞAM" saat={data.Maghrib} ikon="🌆" />
          <VakitKart isim="YATSI" saat={data.Isha} ikon="🌌" />
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>Vakitler yükleniyor...</div>
      )}

      {/* İmza Bölümü */}
      <footer style={{ marginTop: '60px', textAlign: 'center' }}>
        <p style={{ opacity: '0.5', fontSize: '0.8rem', color: '#fff' }}>Diyanet İşleri Başkanlığı uyumlu vakitler.</p>
        <p style={{ marginTop: '10px', fontSize: '1.1rem', fontWeight: '600', color: '#fbbf24', letterSpacing: '1px' }}>
          Yunus Emre Demirtaş
        </p>
      </footer>
    </div>
  );
}

function VakitKart({ isim, saat, ikon }) {
  return (
    <div className="card" style={{ 
      background: 'rgba(255, 255, 255, 0.03)', 
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '30px',
      padding: '40px 30px',
      textAlign: 'center',
      transition: 'all 0.4s ease'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{ikon}</div>
      <h3 style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '3px', marginBottom: '10px' }}>{isim}</h3>
      <div style={{ fontSize: '2.8rem', fontWeight: '700', color: '#fff' }}>{saat}</div>
    </div>
  );
}
