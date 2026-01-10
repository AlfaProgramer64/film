"use client";
import { useState, useEffect } from "react";

const sehirler = [
  "Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya", "Konya", "Gaziantep", "Sanliurfa", "Kocaeli"
  // Buraya daha fazla şehir ekleyebilirsin
];

export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Istanbul");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function getVakitler() {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Turkey&method=13`);
        const result = await res.json();
        setData(result.data.timings);
        setDate(result.data.date.readable);
      } catch (error) {
        console.error("Hata:", error);
      }
    }
    getVakitler();
  }, [city]);

  return (
    <div style={{ width: '100%', maxWidth: '1000px', padding: '20px' }}>
      {/* Üst Başlık Bölümü */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '10px', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NAMAZ VAKİTLERİ
        </h1>
        <p style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: '300', marginBottom: '30px' }}>{date}</p>
        
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <select onChange={(e) => setCity(e.target.value)} value={city}>
            {sehirler.map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ana Tablo / Grid Yapısı */}
      {data ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px',
          padding: '10px'
        }}>
          <VakitKart isim="İMSAK" saat={data.Fajr} ikon="🌙" />
          <VakitKart isim="GÜNEŞ" saat={data.Sunrise} ikon="☀️" />
          <VakitKart isim="ÖĞLE" saat={data.Dhuhr} ikon="🏙️" />
          <VakitKart isim="İKİNDİ" saat={data.Asr} ikon="🌇" />
          <VakitKart isim="AKŞAM" saat={data.Maghrib} ikon="🌆" />
          <VakitKart isim="YATSI" saat={data.Isha} ikon="🌌" />
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#94a3b8' }}>Veriler yükleniyor...</div>
      )}

      {/* Alt Bilgi */}
      <footer style={{ marginTop: '50px', textAlign: 'center', opacity: '0.4', fontSize: '0.8rem' }}>
        T.C. Diyanet İşleri Başkanlığı uyumlu vakitler kullanılır.
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
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
      e.currentTarget.style.borderColor = '#fbbf24';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{ikon}</div>
      <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', letterSpacing: '4px', marginBottom: '10px' }}>{isim}</h3>
      <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff' }}>{saat}</div>
      
      {/* Süsleme için parıltı efekti */}
      <div style={{ 
        position: 'absolute', 
        top: '-50%', 
        left: '-50%', 
        width: '200%', 
        height: '200%', 
        background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>
    </div>
  );
}
