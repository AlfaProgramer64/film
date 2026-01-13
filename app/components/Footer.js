const Footer = ({ isim }) => (
  <footer style={{ marginTop: '60px', textAlign: 'center' }}>
    <p style={{ opacity: '0.5', fontSize: '0.8rem' }}>Diyanet İşleri Başkanlığı uyumlu vakitler.</p>
    <p style={{ marginTop: '10px', fontSize: '1.1rem', fontWeight: '600', color: '#fbbf24' }}>{isim}</p>
  </footer>
);

export default Footer;