# 🌙 Namaz Vakitleri Uygulaması (React / Next.js)

Bu proje, öğrencilerin React bileşen yapısını, API entegrasyonunu ve dinamik veri yönetimini öğrenmesi amacıyla geliştirilmiş bir **Namaz Vakitleri** uygulamasıdır. Kullanıcılar Türkiye'deki farklı şehirleri seçerek o güne ait vakit bilgilerine anlık olarak ulaşabilirler.

![Uygulama Ekran Görüntüsü](resim/ekrangoruntusu.png) ## 🚀 Özellikler

* **Dinamik API Entegrasyonu:** Aladhan API kullanılarak veriler anlık çekilir.
* **Şehir Seçimi:** Kullanıcı dilediği şehri seçerek verileri güncelleyebilir.
* **Modern Tasarım:** Glassmorphism (cam efekti) ve responsive (mobil uyumlu) tasarım.
* **Bileşen Yapısı:** Proje; `Header`, `Content`, `VakitKart` ve `Footer` olmak üzere modüler bileşenlerden oluşur.
* **Hata ve Yüklenme Yönetimi:** Kullanıcı deneyimi için "Yükleniyor..." ve "Hata oluştu" geri bildirimleri mevcuttur.

## 🛠️ Kullanılan Teknolojiler

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Styling:** CSS3 & Styled In-line Styles
* **API:** [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)
* **Font:** Poppins (Google Fonts)

## 📦 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Repoyu bilgisayarınıza indirin:**
    ```bash
    git clone [https://github.com/kullaniciadi/namaz-vakitleri-app.git](https://github.com/kullaniciadi/namaz-vakitleri-app.git)
    ```

2.  **Proje klasörüne gidin:**
    ```bash
    cd namaz-vakitleri-app
    ```

3.  **Gerekli paketleri yükleyin:**
    ```bash
    npm install
    ```

4.  **Uygulamayı geliştirme modunda başlatın:**
    ```bash
    npm run dev
    ```
    *Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görebilirsiniz.*

## 📋 Ödev Gereksinimleri Uyumluluğu

- [x] **En az 3 Bileşen:** Header, Content ve Footer bileşenleri oluşturuldu.
- [x] **API Kullanımı:** fetch ile Aladhan API entegre edildi.
- [x] **Hook Kullanımı:** `useState` ve `useEffect` ile veri yönetimi sağlandı.
- [x] **Girdi Parametresi:** Kullanıcının seçtiği şehre göre API'ye parametre gönderiliyor.
- [x] **Kullanıcı Deneyimi:** Yüklenme ekranı ve hata mesajları eklendi.
- [x] **Modern CSS:** globals.css ve in-line styling ile görselleştirme yapıldı.

## 🔗 Kullanılan Kaynaklar
- API Linki: [Aladhan API](https://api.aladhan.com/v1/timingsByCity)
- Tasarım İlhamı: Modern Dashboard UI

---
**Geliştiren:** [Yunus Emre Demirtaş]
