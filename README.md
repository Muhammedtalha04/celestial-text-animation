# ✨ Celestial Text Animation - Yıldızlarla Yazı Animasyonu

Yıldızların büyülü dansıyla yazılarınızı canlandıran etkileyici web uygulaması! Yazdığınız her kelime, binlerce renkli yıldızın uyumlu hareketiyle görsel bir şölene dönüşür.

![Celestial Text Animation Demo](https://img.shields.io/badge/Status-Live-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🌟 Özellikler

### ✨ Dinamik Yıldız Animasyonu
- **1000 Renkli Yıldız**: 7 farklı renk tonunda parıldayan yıldızlar
- **Pixel-Perfect Metin**: Her harfin pixel analizi ile mükemmel yazı oluşumu
- **Doğal Parıldama**: Her yıldızın kendine özgü ritmi
- **Yumuşak Geçişler**: Easing animasyonları ile doğal hareket

### 🎨 Görsel Efektler
- **Çok Renkli Palet**: Beyaz, krem, mavi, pembe, mor, turuncu, yeşil tonları
- **Glow Efektleri**: Her rengin kendine özgü ışıltısı
- **Responsive Tasarım**: Tüm ekran boyutlarına uyum
- **Minimalist UI**: Dikkat dağıtmayan temiz arayüz

### 🎭 Etkileşimli Deneyim
- **Anlık Tepki**: Yazdığınız anda yıldızlar harekete geçer
- **Hover Dağılması**: Mouse ile yazıya dokunduğunuzda yıldızlar dağılır
- **Smooth Input**: Şeffaf ve modern metin giriş alanı
- **Keyboard Friendly**: Sadece yazmaya odaklanın

## 🚀 Hızlı Başlangıç

### 1. Projeyi İndirin
```bash
git clone https://github.com/[username]/celestial-text-animation.git
cd celestial-text-animation
```

### 2. Web Sunucusu Başlatın
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx http-server -p 8000

# PHP ile
php -S localhost:8000
```

### 3. Tarayıcıda Açın
```
http://localhost:8000
```

## 📁 Proje Yapısı

```
celestial-text-animation/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri ve animasyonlar
├── script.js           # JavaScript animasyon motoru
└── README.md           # Proje dokümantasyonu
```

## 🛠️ Teknik Detaylar

### Teknolojiler
- **HTML5 Canvas**: Yıldız çizimi ve animasyonlar
- **CSS3**: Modern stil ve geçişler
- **Vanilla JavaScript**: Framework'süz performans
- **RequestAnimationFrame**: Optimize edilmiş animasyon döngüsü

### Performans Optimizasyonları
- **Pixel Sampling**: Akıllı metin analizi (her 3. pixel)
- **Color Indexing**: Renk atama optimizasyonu
- **Easing Functions**: Yumuşak animasyon geçişleri
- **Memory Management**: Verimli bellek kullanımı

## 🎮 Kullanım

1. **Yazı Yazın**: Alt kısımdaki input alanına istediğiniz metni yazın
2. **Animasyonu İzleyin**: Yıldızların yazıyı oluşturmasını izleyin
3. **Hover Etkisi**: Mouse'u yazıya götürerek dağılma efektini görün
4. **Yeni Metin**: Yeni kelimeler yazarak farklı renk kombinasyonları keşfedin

## ⚙️ Konfigürasyon

`script.js` dosyasındaki konfigürasyon ayarları:

```javascript
this.config = {
    starCount: 1000,        // Toplam yıldız sayısı
    starMinSize: 0.8,       // Minimum yıldız boyutu
    starMaxSize: 2.5,       // Maximum yıldız boyutu
    starSpeed: 0.04,        // Hareket hızı
    pixelDensity: 3,        // Pixel örnekleme yoğunluğu
    dispersionStrength: 60, // Dağılma kuvveti
    twinkleSpeed: 0.008,    // Parıldama hızı
};
```

## 🎨 Renk Paleti

```javascript
// Kullanılan yıldız renkleri
const starColors = [
    { r: 255, g: 255, b: 255 },  // Beyaz
    { r: 255, g: 250, b: 205 },  // Krem
    { r: 173, g: 216, b: 230 },  // Mavi
    { r: 255, g: 182, b: 193 },  // Pembe
    { r: 221, g: 160, b: 221 },  // Mor
    { r: 255, g: 218, b: 185 },  // Turuncu
    { r: 144, g: 238, b: 144 }   // Yeşil
];
```

## 🌐 Browser Desteği

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 📄 Lisans

Bu proje MIT lisansı altında açık kaynak kodlu olarak paylaşılmıştır. Herkes özgürce kullanabilir, değiştirebilir ve dağıtabilir.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin amazing-feature`)
5. Pull Request oluşturun

## ⭐ Beğendiyseniz

Eğer bu proje hoşunuza gittiyse, lütfen ⭐ vererek destekleyiniz!

## 📧 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Made with Talha and ✨ by the stars** 
