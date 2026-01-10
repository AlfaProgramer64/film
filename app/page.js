"use client";
import { useState, useEffect } from "react";

const sehirler = [
  "Adana", "Adiyaman", "Afyonkarahisar", "Agri", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydin", "Balikesir", "Bartin", "Batman", "Bayburt", "Bilecik", "Bingol", "Bitlis", "Bolu", "Burdur", "Bursa", "Canakkale", "Cankiri", "Corum", "Denizli", "Diyarbakir", "Duzce", "Edirne", "Elazig", "Erzincan", "Erzurum", "Eskisehir", "Gaziantep", "Giresun", "Gumushane", "Hakkari", "Hatay", "Igdir", "Isparta", "Istanbul", "Izmir", "Kahramanmaras", "Karabuk", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kirikkale", "Kirklareli", "Kirsehir", "Kocaeli", "Konya", "Kutahya", "Malatya", "Manisa", "Mardin", "Mersin", "Mugla", "Mus", "Nevsehir", "Nigde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Sanliurfa", "Sirnak", "Tekirdag", "Tokat", "Trabzon", "Tunceli", "Usak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Istanbul");

  useEffect(() => {
    async function getVakitler() {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Turkey&method=13`);
        const result = await res.json();
        setData(result.data.timings);
      } catch (error) {
        console.error("Hata:", error);
      }
    }
    getVakitler();
  }, [city]);

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
      <header style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', color: '#fbbf24' }}>
          Vakit Namazı
        </h1>
        <p style={{ opacity: 0.8, marginBottom: '30px' }}>Şehrinizi seçerek vakitleri takip edebilirsiniz.</p>
        
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          {sehirler.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </header>

      {data ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: '20px'
        }}>
          <VakitKart isim="İMSAK" saat={data.Fajr} />
          <VakitKart isim="GÜNEŞ" saat={data.Sunrise} />
          <VakitKart isim="ÖĞLE" saat={data.Dhuhr} />
          <VakitKart isim="İKİNDİ" saat={data.Asr} />
          <VakitKart isim="AKŞAM" saat={data.Maghrib} />
          <VakitKart isim="YATSI" saat={data.Isha} />
        </div>
      ) : (
        <div className="loader">Yükleniyor...</div>
      )}

      <footer style={{ marginTop: '60px', opacity: 0.5, fontSize: '0.9rem' }}>
        © 2026 Namaz Vakitleri Uygulaması
      </footer>
    </main>
  );
}

function VakitKart({ isim, saat }) {
  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.05)', 
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '30px 20px', 
      borderRadius: '20px',
      transition: 'transform 0.3s ease',
      cursor: 'default'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <h3 style={{ margin: '0 0 15px 0', fontSize: '0.8rem', letterSpacing: '2px', color: '#94a3b8' }}>{isim}</h3>
      <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>{saat}</p>
    </div>
  );
}
