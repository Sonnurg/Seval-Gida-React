# 📁 Dosya Taşıma Haritası - HTML'den React'e

## 🔄 Mevcut Yapınızdan Alınacak Dosyalar

### 📱 **CSS ve Styling**
```
Mevcut: /assets/css/main.css
React'te: 
├── public/assets/css/main.css
└── src/assets/css/main.css (backup)
```

### 🖼️ **Görseller**
```
Mevcut: /assets/img/
React'te: public/assets/img/

Alınacak ana klasörler:
├── about/
├── Certificates-icon/
├── product/
├── apple-touch-icon.png
├── favicon.png
├── istockphoto-1404796170-612x612.JPG
├── logo.webp
└── seval-website-logo.webp
```

### 📦 **Vendor Libraries (Gerekli Olanlar)**
```
Mevcut: /assets/vendor/
React'te: public/assets/vendor/ (sadece gerekli olanlar)

Alınacak:
├── bootstrap/ (CSS dosyaları)
├── bootstrap-icons/
├── aos/ (animasyon için)
└── swiper/ (slider için)

❌ Almayacağınız (npm ile yüklenecek):
├── glightbox/
├── drift-zoom/
├── php-email-form/
└── purecounter/
```

### 📄 **Statik Dosyalar**
```
Mevcut: /
React'te: public/
├── katalog.pdf (varsa)
└── diğer PDF/doküman dosyaları
```

## 🏗️ **React Proje Yapısı**

```
seval-gida-website/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css ✅ (sizin CSS'iniz)
│   │   ├── img/ ✅
│   │   │   ├── about/
│   │   │   ├── Certificates-icon/
│   │   │   ├── product/
│   │   │   ├── logo.webp
│   │   │   └── seval-website-logo.webp
│   │   └── vendor/ ✅ (sadece CSS dosyaları)
│   │       ├── bootstrap/css/
│   │       ├── bootstrap-icons/
│   │       ├── aos/css/
│   │       └── swiper/css/
│   ├── katalog.pdf ✅
│   ├── favicon.png ✅
│   ├── apple-touch-icon.png ✅
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js ⭐
│   │   ├── Footer.js ⭐
│   │   ├── HeroSection.js ⭐
│   │   ├── BestSellers.js ⭐
│   │   ├── PromoCards.js ⭐
│   │   ├── ProductCards.js ⭐
│   │   └── CallToAction.js ⭐
│   ├── pages/
│   │   ├── Home.js ⭐
│   │   ├── About.js ⭐
│   │   ├── Products.js ⭐
│   │   ├── Contact.js ⭐
│   │   ├── Export.js ⭐
│   │   └── Dealer.js ⭐
│   ├── assets/css/
│   │   └── main.css ✅ (backup)
│   ├── App.js ⭐
│   ├── index.js ⭐
│   └── index.css ⭐
├── .github/workflows/
│   └── deploy.yml ⭐
├── package.json ⭐
└── README.md ⭐
```

## 📋 **Hangi HTML Dosyalarını Dönüştürmeliyiz?**

### 🎯 **Öncelikli Sayfalar (React Component'lerine dönüştürülecek):**
```
✅ index.html → Home.js (Ana sayfa)
✅ about.html → About.js (Hakkımızda)
✅ contact.html → Contact.js (İletişim)
✅ product-details.html → ProductDetails.js
✅ category.html → Products.js
```

### 🔄 **İkincil Sayfalar (İhtiyaç halinde):**
```
🟡 faq.html → FAQ.js
🟡 support.html → Support.js
🟡 privacy.html → Privacy.js
🟡 return-policy.html → ReturnPolicy.js
🟡 shipping-info.html → ShippingInfo.js
🟡 payment-methods.html → PaymentMethods.js
```

### ❌ **Kullanmayacağımız HTML Dosyaları:**
```
❌ cart.html (React state ile yapılacak)
❌ checkout.html (React state ile yapılacak)
❌ login.html (React form ile yapılacak)
❌ register.html (React form ile yapılacak)
❌ account.html (React dashboard ile yapılacak)
❌ order-confirmation.html (React ile yapılacak)
❌ search-results.html (React ile yapılacak)
❌ 404.html (React Router ile yapılacak)
❌ starter-page.html (gereksiz)
❌ tos.html (terms of service - ihtiyaç halinde)
```

## 📦 **NPM Paketleri (Bu dosyaları almayın, npm ile yükleyin):**

```bash
npm install react-router-dom bootstrap bootstrap-icons aos swiper
```

## 🚀 **Taşıma Adımları:**

### 1️⃣ **React Projesi Oluşturun:**
```bash
npx create-react-app seval-gida-website
cd seval-gida-website
```

### 2️⃣ **Mevcut Dosyalarınızı Kopyalayın:**
```bash
# CSS dosyanızı kopyalayın
cp /assets/css/main.css ./public/assets/css/
cp /assets/css/main.css ./src/assets/css/

# Görsel dosyalarınızı kopyalayın
cp -r /assets/img/ ./public/assets/img/

# Vendor CSS dosyalarını kopyalayın (sadece CSS)
cp -r /assets/vendor/bootstrap/css/ ./public/assets/vendor/bootstrap/
cp -r /assets/vendor/bootstrap-icons/ ./public/assets/vendor/bootstrap-icons/
cp -r /assets/vendor/aos/css/ ./public/assets/vendor/aos/
cp -r /assets/vendor/swiper/css/ ./public/assets/vendor/swiper/

# Statik dosyalar
cp katalog.pdf ./public/
cp favicon.png ./public/
cp apple-touch-icon.png ./public/
```

### 3️⃣ **React Componentlerini Ekleyin:**
- Yukarıda verdiğim tüm component dosyalarını ekleyin

### 4️⃣ **Package.json'u Güncelleyin:**
```json
{
  "homepage": "https://yourusername.github.io/seval-gida-website",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "bootstrap": "^5.3.0",
    "bootstrap-icons": "^1.10.0",
    "aos": "^2.3.4",
    "swiper": "^9.0.0"
  }
}
```

## ✅ **Özet - Almanız Gereken Dosyalar:**

1. **📱 main.css** (tüm stiliniz)
2. **🖼️ img/ klasörü** (tüm görseller)
3. **📄 katalog.pdf** (varsa)
4. **🎨 favicon.png & apple-touch-icon.png**
5. **📦 vendor/bootstrap/css/** (sadece CSS)
6. **📦 vendor/bootstrap-icons/** 
7. **📦 vendor/aos/css/** (sadece CSS)
8. **📦 vendor/swiper/css/** (sadece CSS)

**❌ JavaScript dosyalarını almayın** - bunları npm ile yükleyeceğiz!

Bu harita size hangi dosyaları taşıyacağınızı ve React projesinde nereye koyacağınızı gösteriyor. Öncelikle ana sayfanızı (index.html) React'e dönüştürüp test edelim, sonra diğer sayfalara geçelim.
