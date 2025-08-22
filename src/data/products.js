// src/data/products.js

// Product categories
export const categories = [
  {
    id: 1,
    name: "Zeytinyağı",
    slug: "zeytinyagi",
    description: "Premium kalitede soğuk sıkım zeytinyağları",
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Bal",
    slug: "bal",
    description: "Doğal ve organik bal çeşitleri",
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Reçel",
    slug: "recel",
    description: "Geleneksel lezzetlerde el yapımı reçeller",
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    name: "Turşu",
    slug: "tursu",
    description: "Geleneksel yöntemlerle hazırlanmış turşular",
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "Konserve",
    slug: "konserve",
    description: "Doğal koruyucu madde içermeyen konserveler",
    image: "/api/placeholder/300/200"
  }
];

// Sample products data
export const products = [
  {
    id: 1,
    name: "Premium Organik Zeytinyağı",
    slug: "premium-organik-zeytinyagi",
    category: "Zeytinyağı",
    categorySlug: "zeytinyagi",
    price: 299.99,
    oldPrice: 349.99,
    description: "Soğuk sıkım, organik sertifikalı premium zeytinyağı. Antioksidan açısından zengin.",
    longDescription: "Bu premium organik zeytinyağı, Ege Bölgesi'nin en kaliteli zeytinlerinden soğuk sıkım yöntemiyle üretilmiştir. Organik sertifikalı ürünümüz, hiçbir kimyasal işlem görmeden tamamen doğal yöntemlerle elde edilmiştir.",
    image: "/api/placeholder/400/400",
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ["organik", "soğuk sıkım", "premium"],
    specifications: {
      "Hacim": "500ml",
      "Üretim Yöntemi": "Soğuk Sıkım",
      "Sertifika": "Organik",
      "Menşei": "Türkiye"
    }
  },
  {
    id: 2,
    name: "Doğal Çiçek Balı",
    slug: "dogal-cicek-bali",
    category: "Bal",
    categorySlug: "bal",
    price: 199.99,
    description: "Kırsal alanlardan toplanan doğal çiçek balı. Kristalleşme garantili.",
    longDescription: "Anadolu'nun en temiz doğal alanlarından toplanan çiçek balı. Arılarımız hiçbir şeker verilmeden beslenmekte, bal tamamen doğal ortamdan toplanmaktadır.",
    image: "/api/placeholder/400/400",
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    inStock: true,
    featured: false,
    bestseller: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ["doğal", "çiçek balı", "kristal"],
    specifications: {
      "Ağırlık": "460g",
      "Tip": "Çiçek Balı",
      "Menşei": "Anadolu",
      "Kristalleşme": "Doğal"
    }
  },
  {
    id: 3,
    name: "Kayısı Reçeli",
    slug: "kayisi-receli",
    category: "Reçel",
    categorySlug: "recel",
    price: 89.99,
    description: "Malatya kayısısından hazırlanmış ev yapımı reçel. Şeker oranı düşük.",
    longDescription: "Malatya'nın en kaliteli kayısılarından, geleneksel yöntemlerle hazırlanmış reçel. Yapay koruyucu madde içermez.",
    image: "/api/placeholder/400/400",
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    inStock: true,
    featured: true,
    bestseller: false,
    rating: 4.6,
    reviewCount: 67,
    tags: ["kayısı", "ev yapımı", "düşük şeker"],
    specifications: {
      "Ağırlık": "380g",
      "Meyve Oranı": "%65",
      "Şeker Oranı": "Düşük",
      "Menşei": "Malatya"
    }
  }]