"use client";
import { useState, useEffect } from "react";

// --- BİLEŞEN 1: HEADER ---
const Header = ({ trTarih }) => (
  <header style={{ textAlign: 'center', marginBottom: '50px' }}>
    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '5px', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      NAMAZ VAKİTLERİ
    </h1>
    <p style={{ color: '#fbbf24', fontSize: '1.3rem', fontWeight: '400' }}>{trTarih}</p>
  </header>
);

// --- BİLEŞEN 2: CONTENT (Verilerin Listelendiği Bölüm) ---
const Content = ({ data, loading, error, city, setCity, sehirler }) => {
  return (
    <main>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          {sehirler.map((s) => (
            <option key={s} value={s}>{s.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {loading && <div style={{ textAlign: 'center' }}>Yükleniyor...</div>}
      {error && <div style={{ textAlign: 'center', color: '#ff4444' }}>Hata: {error}</div>}

      {data && !loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          <VakitKart isim="İMSAK" saat={data.Fajr} ikon="🌙" />
          <VakitKart isim="GÜNEŞ" saat={data.Sunrise} ikon="☀️" />
          <VakitKart isim="ÖĞLE" saat={data.Dhuhr} ikon="🏙️" />
          <VakitKart isim="İKİNDİ" saat={data.Asr} ikon="🌇" />
          <VakitKart isim="AKŞAM" saat={data.Maghrib} ikon="🌆" />
          <VakitKart isim="YATSI" saat={data.Isha} ikon="🌌" />
        </div>
      )}
    </main>
  );
};

// --- BİLEŞEN 3: FOOTER ---
const Footer = ({ isim }) => (
  <footer style={{ marginTop: '60px', textAlign: 'center' }}>
    <p style={{ opacity: '0.5', fontSize: '0.8rem' }}>Diyanet İşleri Başkanlığı uyumlu vakitler.</p>
    <p style={{ marginTop: '10px', fontSize: '1.1rem', fontWeight: '600', color: '#fbbf24' }}>{isim}</p>
  </footer>
);

// Yardımcı Küçük Bileşen
function VakitKart({ isim, saat, ikon }) {
  return (
    <div className="card" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '30px', padding: '40px 30px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{ikon}</div>
      <h3 style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '3px' }}>{isim}</h3>
      <div style={{ fontSize: '2.8rem', fontWeight: '700' }}>{saat}</div>
    </div>
  );
}

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
      <Header trTarih={trTarih} />
      <Content 
        data={data} 
        loading={loading} 
        error={error} 
        city={city} 
        setCity={setCity} 
        sehirler={sehirler} 
      />
      <Footer isim="Yunus Emre Demirtaş" />
    </div>
  );
}
