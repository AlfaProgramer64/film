const Header = ({ trTarih }) => (
  <header style={{ textAlign: 'center', marginBottom: '50px' }}>
    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '5px', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      NAMAZ VAKİTLERİ
    </h1>
    <p style={{ color: '#fbbf24', fontSize: '1.3rem', fontWeight: '400' }}>{trTarih}</p>
  </header>
);

export default Header;