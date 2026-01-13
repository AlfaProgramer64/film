function VakitKart({ isim, saat, ikon }) {
  return (
    <div className="card" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '30px', padding: '40px 30px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{ikon}</div>
      <h3 style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '3px' }}>{isim}</h3>
      <div style={{ fontSize: '2.8rem', fontWeight: '700' }}>{saat}</div>
    </div>
  );
}

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

export default Content;