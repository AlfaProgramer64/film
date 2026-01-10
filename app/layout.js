import "./globals.css";

export const metadata = {
  title: "Namaz Vakitleri",
  description: "Şehirlere göre namaz vakitleri uygulaması",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
