import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  ShoppingBag,
  Instagram,
  ArrowUpRight,
  X,
  Package,
  ShieldCheck,
  Sparkles,
  Menu
} from 'lucide-react';

// ============================================================================
// KONFIGURASI KONTAK & IDENTITAS BRAND "whüut"
// ============================================================================
const STORE_CONFIG = {
  brandName: 'whüut',
  whatsappNumber: '6281808688747',
  shopeeUrl: 'https://id.shp.ee/QdNUd3jd',
  instagramUrl: 'https://www.instagram.com/whuut.id/',
  instagramHandle: '@whuut.id',
};

// ============================================================================
// DATA 4 KOLEKSI PARFUM UTAMA "whüut" (HARGA SERAGAM Rp 85.000)
// ============================================================================
const PERFUMES = [
  {
    id: 'introvert',
    number: '01',
    name: 'INTROVERT.',
    tagline: '"A Quiet Charm That Speaks Volumes."',
    vibe: 'Soft Fruity, Floral & Warm Sandalwood',
    timeTag: 'Tenang & Intimate',
    size: '35ml',
    sizeLabel: '35ml (Travel Friendly Container)',
    concentration: 'Eau De Parfume',
    price: 85000,
    description:
      'Ada keindahan tersendiri dalam ketenangan. Varian ini diciptakan bagi kamu yang menyukai kehangatan tanpa harus menarik perhatian berlebih, meninggalkan jejak aroma yang lembut, misterius, dan menenangkan.',
    packageInfo: 'Botol Spray Kaca + Box Eksklusif + Stiker Varian',
    safetyStandard: 'Pengemasan Rapi dengan Bubble Wrap Berlapis Extra',
    image: '/images/introvert.jpg',
    hoverImage: '/images/introvert-hover.jpg',
    shopeeLink: STORE_CONFIG.shopeeUrl,
    mainNotes: ['Passion Fruit', 'Magnolia', 'Vanilla', 'Sandalwood'],
    notes: {
      top: ['Passion Fruit', 'Raspberry', 'Peach', 'Pear'],
      middle: ['Magnolia', 'Peony'],
      base: ['Vanilla', 'Musk', 'Sandalwood'],
    },
    expressionLabel: 'Calm & Quiet Charm',
  },
  {
    id: 'extrovert',
    number: '02',
    name: 'EXTROVERT.',
    tagline: '"Vibrant, Energetic & Unapologetically Bright."',
    vibe: 'Tropical Sweet Fruity & White Floral',
    timeTag: 'Ceria & Sepanjang Hari',
    size: '35ml',
    sizeLabel: '35ml (Travel Friendly Container)',
    concentration: 'Eau De Parfume',
    price: 85000,
    description:
      'Diciptakan khusus buat kamu yang penuh semangat, ceria, dan tidak ragu menjadi pusat perhatian. Aromanya yang kaya akan buah tropis manis berpadu dengan keanggunan floral memancarkan aura positif sepanjang hari.',
    packageInfo: 'Botol Spray Kaca + Box Eksklusif + Stiker Varian',
    safetyStandard: 'Pengemasan Rapi dengan Bubble Wrap Berlapis Extra',
    image: '/images/extrovert.jpg',
    hoverImage: '/images/extrovert-hover.jpg',
    shopeeLink: STORE_CONFIG.shopeeUrl,
    mainNotes: ['Pineapple', 'White Floral', 'Pink Peony', 'Cedarwood'],
    notes: {
      top: ['White Floral', 'Pineapple', 'Passion Fruit'],
      middle: ['Peach', 'Pink Peony'],
      base: ['Tuberose', 'Musk', 'Cedarwood'],
    },
    expressionLabel: 'Vibrant & Energetic',
  },
  {
    id: 'corporate',
    number: '03',
    name: 'Si Paling Corporate.',
    tagline: '"Sophisticated, Sharp, and Effortlessly Ambitious."',
    vibe: 'Citrus Bergamot, Black Tea & Blonde Wood',
    timeTag: 'Meeting & Profesional',
    size: '35ml',
    sizeLabel: '35ml (Travel Friendly Container)',
    concentration: 'Eau De Parfume',
    price: 85000,
    description:
      'Menghadiri meeting penting hingga melobi klien butuh daya pikat dan rasa percaya diri tinggi. Menggabungkan kesegaran citrus bergamot, teh hitam, serta kehangatan kayu blonde wood yang berkelas.',
    packageInfo: 'Botol Spray Kaca + Box Eksklusif + Stiker Varian',
    safetyStandard: 'Pengemasan Rapi dengan Bubble Wrap Berlapis Extra',
    image: '/images/corporate.jpg',
    hoverImage: '/images/corporate-hover.jpg',
    shopeeLink: STORE_CONFIG.shopeeUrl,
    mainNotes: ['Bergamot', 'Black Tea', 'Ambroxan', 'Blonde Wood'],
    notes: {
      top: ['Bergamot', 'Citron', 'Saffron'],
      middle: ['Black Tea', 'Ginger', 'Violet'],
      base: ['Ambroxan', 'Vetiver', 'Blonde Wood'],
    },
    expressionLabel: 'Sharp & Ambitious',
  },
  {
    id: 'sport',
    number: '04',
    name: 'Si Paling Sport.',
    tagline: '"Crisp, Dynamic, and Unstoppably Energetic."',
    vibe: 'Fresh Pear, Aromatic Sage & Woody Amber',
    timeTag: 'Aktif & Outdoor',
    size: '35ml',
    sizeLabel: '35ml (Travel Friendly Container)',
    concentration: 'Eau De Parfume',
    price: 85000,
    description:
      'Untuk kamu yang beraktivitas tinggi dan hobi tantangan. Dirancang sebagai penyegar instan yang menjaga tubuh tetap wangi dan percaya diri berkat perpaduan buah segar, sage, dan aroma kayu amber yang tangguh.',
    packageInfo: 'Botol Spray Kaca + Box Eksklusif + Stiker Varian',
    safetyStandard: 'Pengemasan Rapi dengan Bubble Wrap Berlapis Extra',
    image: '/images/sport.jpg',
    hoverImage: '/images/sport-hover.jpg',
    shopeeLink: STORE_CONFIG.shopeeUrl,
    mainNotes: ['Pear', 'Ginger', 'Sage', 'Amber'],
    notes: {
      top: ['Pear', 'Berries', 'Ginger'],
      middle: ['Sage', 'Geranium', 'Violet'],
      base: ['Wood', 'Musk', 'Amber'],
    },
    expressionLabel: 'Crisp & Dynamic',
  },
];

// ============================================================================
// HELPER FORMAT RUPIAH & GENERATOR PESAN WHATSAPP OTOMATIS
// ============================================================================
const formatPrice = (price) => {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(price);
};

const createWhatsAppLink = (perfume) => {
  const priceText = formatPrice(perfume.price);
  const text = `Halo *${STORE_CONFIG.brandName}*, saya mau pesan parfum varian *${perfume.name}* (${perfume.concentration} — ${perfume.sizeLabel}) seharga *${priceText}*. Apakah stoknya tersedia?`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

// ============================================================================
// IKON WHATSAPP RESMI (WARNA HIJAU / PUTIH SESUAI KONTEKS)
// ============================================================================
function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.491 1.337 5.013L2 22l5.115-1.341a9.975 9.975 0 0 0 4.916 1.298h.004c5.522 0 10.006-4.485 10.006-10.008C22.041 6.485 17.554 2 12.031 2zm5.822 14.127c-.246.693-1.433 1.326-1.996 1.409-.517.077-1.171.11-1.894-.12-.438-.139-.998-.327-1.713-.636-2.998-1.295-4.956-4.316-5.106-4.516-.15-.2-1.219-1.622-1.219-3.095 0-1.473.771-2.197 1.045-2.496.274-.3.598-.375.798-.375.2 0 .399.002.574.01.184.009.43-.07.673.514.249.599.847 2.072.922 2.222.075.15.125.325.025.524-.1.2-.15.325-.299.499-.15.175-.314.391-.449.525-.15.149-.306.311-.131.611.174.3.774 1.277 1.662 2.069 1.142 1.018 2.104 1.333 2.404 1.483.3.15.474.125.649-.075.175-.2.748-.873.948-1.173.2-.3.399-.25.673-.15.275.1 1.746.823 2.045.973.3.15.499.225.574.35.075.125.075.724-.171 1.417z" />
    </svg>
  );
}

// ============================================================================
// KOMPONEN LOGO TEKS "whüut" PERSIS GAMBAR REFERENSI ASLI:
// "wh" & "ut" hitam pekat (atau putih di dark mode),
// huruf "u" oranye bata (#C86D2D) dengan dua titik kotak vertikal yang terangkat
// proporsional di atasnya sesuai media_1793745241436_9392f0bc.png
// ============================================================================
export function WhuutWordmark({ className = 'text-2xl sm:text-3xl', darkMode }) {
  const mainColor = darkMode ? '#F4F3EF' : '#141413';
  const accentColor = '#C86D2D';

  return (
    <span
      className={`font-brand inline-flex items-baseline font-extrabold tracking-[-0.04em] leading-none select-none relative ${className}`}
      aria-label="whüut"
    >
      <span style={{ color: mainColor }}>wh</span>
      <span
        className="relative inline-flex flex-col items-center mx-[0.01em]"
        style={{ color: accentColor }}
      >
        {/* Dua titik kotak di atas huruf u persis gambar referensi */}
        <span
          aria-hidden="true"
          className="absolute -top-[0.14em] left-1/2 -translate-x-1/2 flex items-center justify-between w-[0.58em] pointer-events-none"
        >
          <span
            className="w-[0.18em] h-[0.16em] rounded-[1px]"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="w-[0.18em] h-[0.16em] rounded-[1px]"
            style={{ backgroundColor: accentColor }}
          />
        </span>
        <span>u</span>
      </span>
      <span style={{ color: mainColor }}>ut</span>
    </span>
  );
}

// ============================================================================
// KOMPONEN STIKER LABEL BOTOL "whüut" (MENGGUNAKAN GAMBAR LABEL ASLI TRANSPARAN)
// ============================================================================
const LABEL_IMAGES = {
  introvert: '/images/label-introvert.png',
  extrovert: '/images/label-extrovert.png',
  corporate: '/images/label-corporate.png',
  sport: '/images/label-sport.png',
};

function WhuutBottleLabel({
  variant = 'introvert',
  className = 'w-full max-w-[300px]',
  alt,
  loading = 'lazy',
  darkMode = false,
}) {
  const imageSrc = LABEL_IMAGES[variant];
  if (imageSrc) {
    const defaultAlt = `Label ${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    return (
      <img
        src={imageSrc}
        alt={alt || defaultAlt}
        loading={loading}
        decoding={loading === 'eager' ? 'sync' : 'async'}
        className={`object-contain select-none ${className} ${
          darkMode ? 'drop-shadow-[0_2px_10px_rgba(245,240,220,0.12)]' : ''
        }`}
      />
    );
  }

  const paperBg = '#F2ECD9';
  const terra = '#B63E26'; // Merah bata terracotta (Introvert & Extrovert)
  const charcoal = '#1E2220'; // Hitam arang (Corporate & Sport)
  const gold = '#C68B2C'; // Emas ochre (Jam, Matahari, teks whüut Corporate & Sport)

  const isDarkInkVariant = variant === 'corporate' || variant === 'sport';
  const borderStroke = isDarkInkVariant ? charcoal : terra;
  const footerTextColor = isDarkInkVariant ? gold : terra;
  const brandLogoColor = isDarkInkVariant ? gold : terra;

  return (
    <svg
      viewBox="0 0 300 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Stiker Label Botol whüut — ${variant}`}
    >
      {/* Bingkai Kubah Lengkung Stiker Botol (Arched Label Frame) */}
      <path
        d="M 14 338 L 14 152 A 136 136 0 0 1 286 152 L 286 338 Z"
        fill={paperBg}
        stroke={borderStroke}
        strokeWidth="9"
        strokeLinejoin="round"
      />

      <defs>
        <path
          id={`arch-title-${variant}`}
          d="M 38 152 A 112 112 0 0 1 262 152"
        />
      </defs>

      {/* HEADER MELENGKUNG */}
      {variant === 'introvert' && (
        <g>
          <text
            fill={terra}
            fontSize="29"
            fontWeight="800"
            letterSpacing="0.12em"
            className="font-serif-title"
          >
            <textPath
              href={`#arch-title-${variant}`}
              startOffset="50%"
              textAnchor="middle"
            >
              INTROVERT
            </textPath>
          </text>
          <text
            x="150"
            y="120"
            textAnchor="middle"
            fill={terra}
            fontSize="27"
            fontWeight="800"
            letterSpacing="-0.04em"
            className="font-brand"
          >
            whüut
          </text>
        </g>
      )}

      {variant === 'extrovert' && (
        <g>
          <text
            fill={terra}
            fontSize="29"
            fontWeight="800"
            letterSpacing="0.12em"
            className="font-serif-title"
          >
            <textPath
              href={`#arch-title-${variant}`}
              startOffset="50%"
              textAnchor="middle"
            >
              EXTROVERT
            </textPath>
          </text>
          <text
            x="150"
            y="120"
            textAnchor="middle"
            fill={terra}
            fontSize="27"
            fontWeight="800"
            letterSpacing="-0.04em"
            className="font-brand"
          >
            whüut
          </text>
        </g>
      )}

      {variant === 'corporate' && (
        <g>
          <text
            fill={charcoal}
            fontSize="20.5"
            fontWeight="800"
            letterSpacing="0.06em"
            className="font-serif-title"
          >
            <textPath
              href={`#arch-title-${variant}`}
              startOffset="50%"
              textAnchor="middle"
            >
              SI PALING CORPORATE
            </textPath>
          </text>

          {/* Ikon Jam Dinding Emas */}
          <g transform="translate(150, 76)">
            <circle
              cx="0"
              cy="0"
              r="15"
              fill={paperBg}
              stroke={gold}
              strokeWidth="2.5"
            />
            <line x1="0" y1="-12" x2="0" y2="-10" stroke={gold} strokeWidth="2" />
            <line x1="0" y1="12" x2="0" y2="10" stroke={gold} strokeWidth="2" />
            <line x1="-12" y1="0" x2="-10" y2="0" stroke={gold} strokeWidth="2" />
            <line x1="12" y1="0" x2="10" y2="0" stroke={gold} strokeWidth="2" />
            <polyline
              points="-6,-1 0,-1 0,8"
              stroke={gold}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          <text
            x="150"
            y="119"
            textAnchor="middle"
            fill={brandLogoColor}
            fontSize="26"
            fontWeight="800"
            letterSpacing="-0.04em"
            className="font-brand"
          >
            whüut
          </text>
        </g>
      )}

      {variant === 'sport' && (
        <g>
          <text
            fill={charcoal}
            fontSize="22"
            fontWeight="800"
            letterSpacing="0.07em"
            className="font-serif-title"
          >
            <textPath
              href={`#arch-title-${variant}`}
              startOffset="50%"
              textAnchor="middle"
            >
              SI PALING SPORT
            </textPath>
          </text>

          {/* Ikon Matahari Bersinar Emas */}
          <g transform="translate(150, 77)">
            <circle
              cx="0"
              cy="0"
              r="13.5"
              fill={paperBg}
              stroke={gold}
              strokeWidth="2.6"
            />
            {[...Array(16)].map((_, idx) => {
              const angle = (idx * 360) / 16;
              return (
                <line
                  key={idx}
                  x1="0"
                  y1="-14"
                  x2="0"
                  y2="-18.5"
                  stroke={gold}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  transform={`rotate(${angle})`}
                />
              );
            })}
          </g>

          <text
            x="150"
            y="120"
            textAnchor="middle"
            fill={brandLogoColor}
            fontSize="26"
            fontWeight="800"
            letterSpacing="-0.04em"
            className="font-brand"
          >
            whüut
          </text>
        </g>
      )}

      {/* ADEGAN 1: INTROVERT */}
      {variant === 'introvert' && (
        <g>
          <path
            d="M 52 262 C 55 234, 71 225, 95 225 C 120 225, 134 234, 139 262 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 84 226 L 95 262 L 106 226 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="83" cy="244" r="2.2" fill={paperBg} />
          <circle cx="81" cy="254" r="2.2" fill={paperBg} />
          <path
            d="M 122 248 L 139 250 C 141 258, 139 263, 133 265 L 102 271 C 96 272, 95 264, 101 262 L 122 257 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path
            d="M 127 183 C 134 183, 134 199, 126 202"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 62 169 C 61 206, 73 224, 95 224 C 117 224, 128 206, 127 169 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          <path
            d="M 59 175 C 57 143, 73 130, 95 130 C 118 130, 133 144, 131 177 C 126 173, 122 167, 118 165 L 97 165 L 94 156 L 90 165 L 59 175 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M 76 179 Q 82 177 88 179" stroke={terra} strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 99 179 Q 105 177 111 179" stroke={terra} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="82" cy="189" r="3.8" fill={terra} />
          <circle cx="105" cy="189" r="3.8" fill={terra} />
          <path d="M 85 207 Q 93 204 100 206" stroke={terra} strokeWidth="3.2" strokeLinecap="round" />

          {/* CEWE */}
          <path
            d="M 168 178 C 163 140, 181 129, 207 129 C 233 129, 250 143, 246 184 C 243 203, 237 215, 229 220 L 184 220 C 175 215, 170 200, 168 178 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path
            d="M 172 262 C 175 236, 188 226, 207 226 C 226 226, 239 236, 242 262 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 192 227 Q 207 236 222 227" stroke={terra} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="207" cy="242" r="2.3" fill={terra} />
          <circle cx="207" cy="252" r="2.3" fill={terra} />
          <path d="M 184 246 L 181 262" stroke={terra} strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 230 246 L 233 262" stroke={terra} strokeWidth="3.2" strokeLinecap="round" />
          <path
            d="M 179 169 C 179 205, 189 222, 207 222 C 225 222, 235 205, 235 169 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          <path
            d="M 171 173 C 175 142, 190 131, 208 131 C 226 131, 239 142, 243 173 C 231 169, 221 162, 212 151 C 204 162, 191 169, 171 173 Z"
            fill={terra}
          />
          <path d="M 192 178 Q 198 176 204 178" stroke={terra} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 214 178 Q 220 176 226 178" stroke={terra} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="198" cy="189" r="3.8" fill={terra} />
          <circle cx="220" cy="189" r="3.8" fill={terra} />
          <path d="M 202 206 Q 209 203 216 205" stroke={terra} strokeWidth="3.2" strokeLinecap="round" />

          {/* MEJA + CANGKIR + KUE */}
          <line x1="18" y1="262" x2="282" y2="262" stroke={terra} strokeWidth="3.5" />
          <path
            d="M 60 272 L 82 272 L 80 293 C 80 295, 62 295, 62 293 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M 81 276 C 89 276, 89 288, 80 288"
            stroke={terra}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          <ellipse
            cx="157"
            cy="287"
            rx="43"
            ry="10"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.2"
          />
          <path
            d="M 155 274 L 182 268 L 185 274 L 185 286 L 155 286 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <line x1="156" y1="275" x2="184" y2="275" stroke={paperBg} strokeWidth="2" />

          <line x1="18" y1="278" x2="46" y2="278" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="290" x2="46" y2="290" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="301" x2="88" y2="301" stroke={terra} strokeWidth="3" strokeLinecap="round" />

          <line x1="230" y1="278" x2="282" y2="278" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="216" y1="290" x2="282" y2="290" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="205" y1="301" x2="282" y2="301" stroke={terra} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {/* ADEGAN 2: EXTROVERT */}
      {variant === 'extrovert' && (
        <g>
          <path
            d="M 122 246 C 136 254, 148 255, 159 247 C 165 243, 168 250, 161 255 C 149 264, 134 263, 118 256 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path
            d="M 46 262 C 49 234, 65 225, 90 225 C 115 225, 129 234, 134 262 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 79 226 L 90 262 L 101 226 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="78" cy="244" r="2.2" fill={paperBg} />
          <circle cx="76" cy="254" r="2.2" fill={paperBg} />
          <path
            d="M 57 183 C 49 183, 49 199, 58 202"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 57 169 C 56 206, 68 224, 90 224 C 112 224, 123 206, 122 169 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          <path
            d="M 54 175 C 52 143, 68 130, 90 130 C 113 130, 128 144, 126 177 C 121 173, 117 167, 113 165 L 92 165 L 89 156 L 85 165 L 54 175 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M 73 176 Q 79 173 85 176" stroke={terra} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 96 176 Q 102 173 108 176" stroke={terra} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 73 190 Q 79 181 85 190" stroke={terra} strokeWidth="3.6" strokeLinecap="round" />
          <path d="M 96 190 Q 102 181 108 190" stroke={terra} strokeWidth="3.6" strokeLinecap="round" />
          <path
            d="M 82 203 Q 90.5 214 99 203 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* CEWE */}
          <path
            d="M 172 178 C 167 140, 185 129, 211 129 C 237 129, 254 143, 250 184 C 247 203, 241 215, 233 220 L 188 220 C 179 215, 174 200, 172 178 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <path
            d="M 183 255 C 169 254, 163 243, 164 226 C 165 216, 175 216, 175 226 C 175 236, 179 242, 187 244 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 176 262 C 179 236, 192 226, 211 226 C 230 226, 243 236, 246 262 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 196 227 Q 211 236 226 227" stroke={terra} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="211" cy="242" r="2.3" fill={terra} />
          <circle cx="211" cy="252" r="2.3" fill={terra} />
          <path
            d="M 183 169 C 183 205, 193 222, 211 222 C 229 222, 239 205, 239 169 Z"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          <path
            d="M 175 173 C 179 142, 194 131, 212 131 C 230 131, 243 142, 247 173 C 235 169, 225 162, 216 151 C 208 162, 195 169, 175 173 Z"
            fill={terra}
          />
          <path d="M 194 175 Q 200 171 206 175" stroke={terra} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 217 175 Q 223 171 229 175" stroke={terra} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 194 189 Q 200 179 206 189" stroke={terra} strokeWidth="3.6" strokeLinecap="round" />
          <path d="M 217 189 Q 223 179 229 189" stroke={terra} strokeWidth="3.6" strokeLinecap="round" />
          <path
            d="M 203 202 Q 211.5 213 220 202 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* MEJA + 2 CANGKIR */}
          <path
            d="M 18 263 Q 150 257 282 263"
            stroke={terra}
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M 42 272 L 64 272 L 62 293 C 62 295, 44 295, 44 293 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M 63 276 C 71 276, 71 288, 62 288" stroke={terra} strokeWidth="3.2" fill="none" />

          <ellipse
            cx="148"
            cy="286"
            rx="42"
            ry="9.5"
            fill={paperBg}
            stroke={terra}
            strokeWidth="3.2"
          />

          <path
            d="M 212 271 L 234 271 L 232 292 C 232 294, 214 294, 214 292 Z"
            fill={terra}
            stroke={terra}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M 233 275 C 241 275, 241 287, 232 287" stroke={terra} strokeWidth="3.2" fill="none" />

          <line x1="18" y1="301" x2="78" y2="301" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="246" y1="278" x2="282" y2="278" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="242" y1="290" x2="282" y2="290" stroke={terra} strokeWidth="3" strokeLinecap="round" />
          <line x1="204" y1="301" x2="282" y2="301" stroke={terra} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {/* ADEGAN 3: CORPORATE */}
      {variant === 'corporate' && (
        <g>
          <rect
            x="42"
            y="144"
            width="216"
            height="84"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <rect x="49" y="152" width="11" height="16" rx="1.5" fill={paperBg} stroke={charcoal} strokeWidth="2.2" />
          <rect x="52" y="150" width="5" height="3" fill={charcoal} />
          <rect x="64" y="152" width="11" height="16" rx="1.5" fill={paperBg} stroke={charcoal} strokeWidth="2.2" />
          <rect x="67" y="150" width="5" height="3" fill={charcoal} />

          <path d="M 80 158 Q 88 155 96 158 T 110 158" stroke={charcoal} strokeWidth="1.6" fill="none" />
          <path d="M 156 164 Q 163 161 170 164 T 182 164" stroke={charcoal} strokeWidth="1.6" fill="none" />
          <path d="M 150 185 Q 160 182 170 185 T 188 185" stroke={charcoal} strokeWidth="1.6" fill="none" />
          <path d="M 236 156 Q 242 154 248 156" stroke={charcoal} strokeWidth="1.6" fill="none" />
          <path d="M 236 180 Q 242 178 248 180" stroke={charcoal} strokeWidth="1.6" fill="none" />
          <path d="M 236 202 Q 242 200 248 202" stroke={charcoal} strokeWidth="1.6" fill="none" />

          {/* Lampu Meja */}
          <path
            d="M 60 236 L 84 236 C 82 230, 62 230, 60 236 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.4"
          />
          <polyline
            points="72,231 72,205 56,184 74,170"
            stroke={charcoal}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="72" cy="205" r="2.8" fill={paperBg} stroke={charcoal} strokeWidth="2" />
          <circle cx="74" cy="170" r="2.8" fill={paperBg} stroke={charcoal} strokeWidth="2" />
          <path
            d="M 74 170 L 94 178 L 83 194 L 68 182 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />

          {/* Cowo Corporate */}
          <path
            d="M 103 235 C 102 204, 110 194, 128 194 C 146 194, 154 204, 153 235"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.5"
          />
          <path
            d="M 96 235 C 102 212, 114 205, 128 205 C 142 205, 152 212, 156 235 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <rect x="91" y="231" width="9" height="5" rx="2.5" fill={paperBg} stroke={charcoal} strokeWidth="2" />

          <path
            d="M 107 169 C 107 192, 115 204, 128 204 C 141 204, 149 192, 149 169 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.8"
          />
          <path
            d="M 105 171 C 105 151, 115 144, 128 144 C 141 144, 151 151, 151 171 C 145 166, 138 164, 128 164 C 118 164, 111 166, 105 171 Z"
            fill={charcoal}
          />
          <line x1="117" y1="175" x2="123" y2="175" stroke={charcoal} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="133" y1="175" x2="139" y2="175" stroke={charcoal} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="120" cy="183" r="2.6" fill={charcoal} />
          <circle cx="136" cy="183" r="2.6" fill={charcoal} />
          <path d="M 123 194 Q 128 192 133 194" stroke={charcoal} strokeWidth="2.4" strokeLinecap="round" />

          <rect
            x="105"
            y="206"
            width="46"
            height="30"
            rx="2.5"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <circle cx="128" cy="221" r="3.5" fill={paperBg} stroke={charcoal} strokeWidth="2.2" />
          <rect x="103" y="233" width="50" height="3.5" fill={paperBg} stroke={charcoal} strokeWidth="2" />

          {/* Cewe Corporate */}
          <path
            d="M 183 235 C 185 206, 196 196, 211 196 C 226 196, 237 206, 239 235 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <path
            d="M 186 174 C 184 148, 195 141, 211 141 C 227 141, 238 148, 236 174 C 235 188, 231 197, 226 201 L 196 201 C 191 197, 187 188, 186 174 Z"
            fill={charcoal}
          />
          <path
            d="M 193 169 C 193 191, 200 202, 211 202 C 222 202, 229 191, 229 169 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <path
            d="M 190 170 C 193 152, 201 145, 211 145 C 221 145, 229 152, 232 170 C 224 167, 217 162, 212 155 C 206 162, 199 167, 190 170 Z"
            fill={charcoal}
          />
          <line x1="200" y1="174" x2="206" y2="174" stroke={charcoal} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="216" y1="174" x2="222" y2="174" stroke={charcoal} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="203" cy="182" r="2.6" fill={charcoal} />
          <circle cx="219" cy="182" r="2.6" fill={charcoal} />
          <ellipse cx="211" cy="193" rx="3" ry="2" fill={charcoal} />

          <rect
            x="188"
            y="206"
            width="46"
            height="30"
            rx="2.5"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <circle cx="211" cy="221" r="3.5" fill={paperBg} stroke={charcoal} strokeWidth="2.2" />
          <rect x="186" y="233" width="50" height="3.5" fill={paperBg} stroke={charcoal} strokeWidth="2" />

          {/* MEJA KANTOR */}
          <rect
            x="52"
            y="236"
            width="196"
            height="9"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
          />
          <line x1="52" y1="241" x2="248" y2="241" stroke={charcoal} strokeWidth="2" />
          <rect x="57" y="245" width="5" height="40" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />
          <rect x="238" y="245" width="5" height="40" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />

          <rect x="68" y="253" width="24" height="7" fill={paperBg} stroke={charcoal} strokeWidth="2.2" />
          <rect x="66" y="260" width="28" height="24" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />
          <line x1="75" y1="268" x2="85" y2="268" stroke={charcoal} strokeWidth="2.2" />

          <path d="M 114 245 L 118 278 M 140 245 L 136 278" stroke={charcoal} strokeWidth="6" strokeLinecap="round" />
          <line x1="128" y1="248" x2="128" y2="276" stroke={charcoal} strokeWidth="3.5" />
          <path d="M 110 276 L 146 276" stroke={charcoal} strokeWidth="3" strokeLinecap="round" />
          <circle cx="112" cy="281" r="3" fill={paperBg} stroke={charcoal} strokeWidth="2" />
          <circle cx="128" cy="281" r="3" fill={paperBg} stroke={charcoal} strokeWidth="2" />
          <circle cx="144" cy="281" r="3" fill={paperBg} stroke={charcoal} strokeWidth="2" />

          <path
            d="M 166 280 L 171 275 L 177 278 L 175 284 L 167 284 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path d="M 203 245 L 206 278 M 219 245 L 216 278" stroke={charcoal} strokeWidth="5.5" strokeLinecap="round" />
          <line x1="211" y1="248" x2="211" y2="276" stroke={charcoal} strokeWidth="3.5" />
          <path d="M 193 276 L 229 276" stroke={charcoal} strokeWidth="3" strokeLinecap="round" />
          <circle cx="195" cy="281" r="3" fill={paperBg} stroke={charcoal} strokeWidth="2" />
          <circle cx="211" cy="281" r="3" fill={paperBg} stroke={charcoal} strokeWidth="2" />
          <circle cx="227" cy="281" r="3" fill={paperBg} stroke={charcoal} strokeWidth="2" />

          <line x1="18" y1="285" x2="54" y2="285" stroke={charcoal} strokeWidth="3" />
          <line x1="18" y1="295" x2="72" y2="295" stroke={charcoal} strokeWidth="3" />
          <line x1="18" y1="305" x2="86" y2="305" stroke={charcoal} strokeWidth="3" />

          <line x1="246" y1="278" x2="282" y2="278" stroke={charcoal} strokeWidth="3" />
          <line x1="212" y1="292" x2="282" y2="292" stroke={charcoal} strokeWidth="3" />
          <line x1="202" y1="304" x2="282" y2="304" stroke={charcoal} strokeWidth="3" />
        </g>
      )}

      {/* ADEGAN 4: SPORT */}
      {variant === 'sport' && (
        <g>
          <path
            d="M 22 232 L 52 162 L 66 189 L 76 196 L 90 232 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M 52 162 L 46 195 L 36 228 M 66 189 L 54 228"
            stroke={charcoal}
            strokeWidth="2.2"
            fill="none"
          />

          <path
            d="M 186 238 L 222 132 L 240 156 L 264 188 L 280 242 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M 192 238 L 234 182 L 254 205 L 278 242"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M 222 132 L 210 172 M 234 182 L 214 222 L 266 238"
            stroke={charcoal}
            strokeWidth="2.2"
            fill="none"
          />

          <path d="M 20 233 Q 85 234 146 245" stroke={charcoal} strokeWidth="2.6" fill="none" />
          <path d="M 185 242 Q 235 242 282 248" stroke={charcoal} strokeWidth="2.6" fill="none" />

          {/* Cewe Sport */}
          <path
            d="M 103 175 C 101 156, 109 150, 121 150 C 133 150, 141 157, 139 175 C 138 184, 134 190, 130 192 L 111 192 C 107 190, 104 184, 103 175 Z"
            fill={charcoal}
          />
          <path
            d="M 108 169 C 108 185, 113 193, 121 193 C 129 193, 134 185, 134 169 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.5"
          />
          <path
            d="M 106 170 C 108 158, 114 153, 121 153 C 128 153, 134 158, 136 170 C 130 168, 125 164, 121 159 C 117 164, 112 168, 106 170 Z"
            fill={charcoal}
          />
          <circle cx="116" cy="177" r="2" fill={charcoal} />
          <circle cx="126" cy="177" r="2" fill={charcoal} />
          <circle cx="121" cy="186" r="2" fill={charcoal} />

          <path
            d="M 106 196 C 110 193, 132 193, 136 196 L 133 226 L 109 226 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 107 198 L 99 216 L 112 206"
            stroke={charcoal}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 135 198 L 143 215 L 135 227"
            stroke={charcoal}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 108 226 L 134 226 L 138 244 L 104 244 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="112" y="244" width="9" height="40" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />
          <line x1="112" y1="272" x2="121" y2="272" stroke={charcoal} strokeWidth="2" />
          <line x1="112" y1="276" x2="121" y2="276" stroke={charcoal} strokeWidth="2" />
          <ellipse cx="115" cy="287" rx="8" ry="4.5" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />
          <path
            d="M 122 244 L 128 263 L 138 258"
            stroke={charcoal}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <ellipse cx="141" cy="262" rx="4.5" ry="9" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />

          {/* Cowo Sport */}
          <path
            d="M 164 169 C 164 185, 169 193, 177 193 C 185 193, 190 185, 190 169 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.5"
          />
          <path
            d="M 162 171 C 162 155, 169 149, 177 149 C 185 149, 192 155, 192 171 C 186 167, 182 165, 177 165 C 172 165, 167 167, 162 171 Z"
            fill={charcoal}
          />
          <circle cx="172" cy="177" r="2" fill={charcoal} />
          <circle cx="182" cy="177" r="2" fill={charcoal} />
          <circle cx="177" cy="186" r="2.2" fill={charcoal} />

          <path
            d="M 161 196 C 166 193, 188 193, 193 196 L 189 227 L 165 227 Z"
            fill={charcoal}
            stroke={charcoal}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 162 199 L 154 216 L 167 207"
            stroke={charcoal}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 192 199 L 199 215 L 190 227"
            stroke={charcoal}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 165 227 L 189 227 L 191 244 L 163 244 Z"
            fill={paperBg}
            stroke={charcoal}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="168" y="244" width="9" height="40" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />
          <line x1="168" y1="272" x2="177" y2="272" stroke={charcoal} strokeWidth="2" />
          <line x1="168" y1="276" x2="177" y2="276" stroke={charcoal} strokeWidth="2" />
          <ellipse cx="171" cy="287" rx="8" ry="4.5" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />
          <path
            d="M 179 244 L 185 263 L 195 258"
            stroke={charcoal}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <ellipse cx="198" cy="262" rx="4.5" ry="9" fill={paperBg} stroke={charcoal} strokeWidth="2.4" />

          <line x1="20" y1="262" x2="86" y2="262" stroke={charcoal} strokeWidth="3.2" />
          <line x1="20" y1="276" x2="46" y2="276" stroke={charcoal} strokeWidth="3.2" />
          <line x1="56" y1="276" x2="82" y2="276" stroke={charcoal} strokeWidth="3.2" />
          <line x1="20" y1="288" x2="56" y2="288" stroke={charcoal} strokeWidth="3.2" />
          <line x1="20" y1="300" x2="86" y2="300" stroke={charcoal} strokeWidth="3.2" />

          <line x1="212" y1="262" x2="280" y2="262" stroke={charcoal} strokeWidth="3.2" />
          <line x1="242" y1="276" x2="280" y2="276" stroke={charcoal} strokeWidth="3.2" />
          <line x1="212" y1="288" x2="280" y2="288" stroke={charcoal} strokeWidth="3.2" />
          <line x1="202" y1="300" x2="280" y2="300" stroke={charcoal} strokeWidth="3.2" />
        </g>
      )}

      {/* FOOTER STIKER BOTOL */}
      <text
        x="28"
        y="324"
        fill={footerTextColor}
        fontSize="15.5"
        fontWeight="800"
        letterSpacing="-0.02em"
        className="font-brand"
      >
        eau de parfume
      </text>
      <text
        x="272"
        y="324"
        textAnchor="end"
        fill={footerTextColor}
        fontSize="16.5"
        fontWeight="800"
        letterSpacing="-0.02em"
        className="font-brand"
      >
        35ml
      </text>
    </svg>
  );
}

// ============================================================================
// CUSTOM HOOK: SCROLL REVEAL RINGAN & MULUS (GPU-ACCELERATED)
// ============================================================================
function useScrollReveal(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce ?? true) {
            observer.unobserve(node);
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -30px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, isVisible];
}

// ============================================================================
// KOMPONEN KARTU PARFUM (HALUS, BERPERFORMA TINGGI TANPA BLUR JANK)
// ============================================================================
function PerfumeCard({
  item,
  index,
  darkMode,
  onSelectPerfume,
}) {
  const [cardRef, isVisible] = useScrollReveal({
    threshold: 0.08,
    triggerOnce: true,
  });

  const staggerDelay = (index % 2) * 120;

  return (
    <article
      ref={cardRef}
      onClick={() => onSelectPerfume(item)}
      style={{ transitionDelay: `${staggerDelay}ms` }}
      className={`group rounded-2xl border overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-700 ease-out will-change-transform ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-[0.99]'
        } ${darkMode
          ? 'bg-[#161615] border-[#262624] hover:border-[#C86D2D]/70'
          : 'bg-[#FAF6E8] border-[#D8D0BA] hover:border-[#141413] hover:shadow-xl hover:shadow-black/[0.05]'
        }`}
    >
      <div>
        {/* Gambar Produk */}
        <div className="relative aspect-square w-full overflow-hidden">
          {/* Foto Utama */}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out group-hover:opacity-0"
          />

          {/* Foto Hover (Notes) Bertumpuk di Atas (Fade In Tanpa Zoom Scale) */}
          <img
            src={item.hoverImage}
            alt={`${item.name} preview`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        </div>

        {/* Informasi Parfum */}
        <div className="p-5 sm:p-7">
          {/* Baris Badge Nomor & Ukuran (Tepat di Bawah Foto, Responsif Wrap) */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span
              className={`font-ui px-3 py-1 rounded-full text-[12px] font-semibold backdrop-blur-md transition-all duration-500 ${darkMode
                ? 'bg-[#0E0E0D]/85 text-[#F4F3EF]'
                : 'bg-[#F5F0DC]/95 text-[#141413] border border-[#141413]/15'
                }`}
            >
              {item.number} / {item.concentration}
            </span>
            <span
              className={`font-ui px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold backdrop-blur-md transition-all duration-500 ${darkMode
                ? 'bg-[#0E0E0D]/85 text-[#C86D2D]'
                : 'bg-[#F5F0DC]/95 text-[#B63E26] border border-[#B63E26]/20'
                }`}
            >
              {item.size} • Travel Friendly
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-ui text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[#C86D2D]">
                  whüut #{item.number}
                </span>
                <span
                  className={`font-ui text-[11px] sm:text-[12px] px-2 py-0.5 rounded-full font-medium ${darkMode
                    ? 'bg-[#22211F] text-[#A09F99]'
                    : 'bg-[#EDE6CE] text-[#4A4336]'
                    }`}
                >
                  {item.expressionLabel}
                </span>
              </div>

              <h2
                className={`font-serif-title text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[40px] font-semibold tracking-tight leading-[1.12] ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'
                  }`}
              >
                {item.name}
              </h2>

              <p
                className={`font-serif-title italic text-[14px] xs:text-[15px] sm:text-[17px] font-normal leading-snug ${darkMode ? 'text-[#D0CFC9]' : 'text-[#5C5343]'
                  }`}
              >
                {item.tagline}
              </p>
            </div>

            {/* Ilustrasi Stiker Botol */}
            <div
              className="shrink-0 self-start transition-transform duration-500 group-hover:scale-105 origin-top-right sm:origin-center"
              title={`Stiker Botol: ${item.name}`}
            >
              <WhuutBottleLabel
                variant={item.id}
                alt={`Label ${item.name.replace(/\.$/, '')}`}
                loading="lazy"
                darkMode={darkMode}
                className="w-16 xs:w-20 sm:w-28 h-auto drop-shadow-xs"
              />
            </div>
          </div>

          <p
            className={`font-body text-[15px] sm:text-[16px] leading-[1.65] mt-4 ${darkMode ? 'text-[#9E9D97]' : 'text-[#4A4336]'
              }`}
          >
            {item.description}
          </p>

          {/* Notes */}
          <div
            className={`font-body text-[13px] sm:text-[14px] mt-4 p-3.5 rounded-xl border space-y-1.5 ${darkMode
              ? 'bg-[#121211] border-[#242422]'
              : 'bg-[#F2ECD9] border-[#D8D0BA]'
              }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className={`font-semibold shrink-0 ${darkMode ? 'text-[#A09F99]' : 'text-[#141413]'}`}>
                (Top) Notes :
              </span>
              <span className="text-right font-medium">
                {item.notes.top.join(', ')}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`font-semibold shrink-0 ${darkMode ? 'text-[#A09F99]' : 'text-[#141413]'}`}>
                (Middle) Notes :
              </span>
              <span className="text-right font-medium">
                {item.notes.middle.join(', ')}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`font-semibold shrink-0 ${darkMode ? 'text-[#A09F99]' : 'text-[#141413]'}`}>
                (Base) Notes :
              </span>
              <span className="text-right font-medium">
                {item.notes.base.join(', ')}
              </span>
            </div>
          </div>

          <div className="font-body text-[13px] sm:text-[14px] mt-4 flex items-center justify-between">
            <span className={darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'}>
              Ukuran Bersih : <strong className={`font-ui font-bold ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'}`}>35ml</strong> ({item.concentration})
            </span>

            <span
              className={`font-ui text-[13px] sm:text-[14px] font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${darkMode ? 'text-[#C86D2D]' : 'text-[#141413]'
                }`}
            >
              <span>Detail Paket</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Kartu */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`px-5 sm:px-7 py-4 border-t flex flex-wrap items-center justify-between gap-3 ${darkMode
          ? 'bg-[#121211] border-[#262624]'
          : 'bg-[#EFE8D0] border-[#D8D0BA]'
          }`}
      >
        <div>
          <span
            className={`font-ui text-[24px] sm:text-[26px] font-bold block leading-tight ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'
              }`}
          >
            {formatPrice(item.price)}
          </span>
          <span
            className={`font-ui text-[11px] sm:text-[12px] block font-medium ${darkMode ? 'text-[#8E8D87]' : 'text-[#635947]'
              }`}
          >
            35ml • Full Box & Stiker
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={createWhatsAppLink(item)}
            target="_blank"
            rel="noopener noreferrer"
            className="group/wa relative overflow-hidden px-4 py-2 rounded-lg font-ui text-[13px] sm:text-[14px] font-semibold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 bg-[#25D366] text-white hover:bg-[#1EBE5A] shadow-sm hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full animate-wa-sheen bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <WhatsAppIcon className="w-4 h-4 transition-transform duration-300 group-hover/wa:-rotate-12 group-hover/wa:scale-110" />
            <span>Pesan WA</span>
          </a>

          <a
            href={item.shopeeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-2 rounded-lg font-ui text-[13px] sm:text-[14px] font-semibold border flex items-center gap-1.5 transition-colors ${darkMode
              ? 'border-[#262624] hover:border-[#454540] text-[#F4F3EF]'
              : 'border-[#141413]/20 bg-[#FAF6E8] hover:border-[#141413] text-[#141413]'
              }`}
            title="Beli via Shopee"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shopee</span>
          </a>

          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg border transition-colors ${darkMode
              ? 'border-[#262624] hover:border-[#454540] text-[#F4F3EF]'
              : 'border-[#141413]/20 bg-[#FAF6E8] hover:border-[#141413] text-[#141413]'
              }`}
            title="DM Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// KOMPONEN UTAMA APLIKASI
// ============================================================================
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [heroMood, setHeroMood] = useState('introvert');
  const [activePerfume, setActivePerfume] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const progressBarRef = useRef(null);

  const [heroRef, isHeroVisible] = useScrollReveal({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [stepsRef, isStepsVisible] = useScrollReveal({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [footerRef, isFooterVisible] = useScrollReveal({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Listener Scroll Ringan Langsung via Ref (Tanpa re-render state react berulang-ulang)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kunci scroll layar belakang saat modal detail dibuka
  useEffect(() => {
    if (activePerfume) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePerfume]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroLine1Words = ['A', 'scent', 'made', 'for', 'you.'];
  const heroLine2Words = ['WHUUT', 'FOR', 'YOU.'];

  const moodOptions = [
    { id: 'introvert', label: 'Introvert' },
    { id: 'extrovert', label: 'Extrovert' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'sport', label: 'Sport' },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans antialiased ${darkMode
        ? 'bg-[#0E0E0D] text-[#F4F3EF] selection:bg-[#C86D2D] selection:text-white'
        : 'bg-[#F5F0DC] text-[#141413] selection:bg-[#141413] selection:text-[#F5F0DC]'
        }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Manrope:wght@500;600;700;800&display=swap');
        .font-serif-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans, .font-body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-ui, .font-manrope, .font-brand {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Animasi Kilau Cahaya (Shimmer Sweep) Setiap 3.5 Detik */
        @keyframes waSheen {
          0% {
            transform: translateX(-140%) skewX(-20deg);
          }
          32%, 100% {
            transform: translateX(220%) skewX(-20deg);
          }
        }

        /* Animasi Pulse Ring Aura Halus di Sekeliling Tombol Chat WA */
        @keyframes waRingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.07, 1.18);
            opacity: 0;
          }
        }

        /* Animasi Gerakan Halus Ikon WhatsApp */
        @keyframes waIconWiggle {
          0%, 74%, 100% {
            transform: rotate(0deg) scale(1);
          }
          80% {
            transform: rotate(-14deg) scale(1.12);
          }
          86% {
            transform: rotate(12deg) scale(1.12);
          }
          92% {
            transform: rotate(-6deg) scale(1.05);
          }
        }

        .animate-wa-sheen {
          animation: waSheen 3.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-wa-ring {
          animation: waRingPulse 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-wa-wiggle {
          animation: waIconWiggle 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* ====================================================================
          1. NAVBAR MINIMALIS (RESPONSIF PENUH DI HP, TABLET & DESKTOP)
      ==================================================================== */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${darkMode
          ? 'bg-[#0E0E0D]/90 border-[#262624]'
          : 'bg-[#F5F0DC]/95 border-[#D8D0BA]'
          }`}
      >
        {/* Garis Indikator Progres Scroll */}
        <div className="w-full h-[3px] bg-transparent overflow-hidden">
          <div
            ref={progressBarRef}
            style={{ width: '0%' }}
            className="h-full transition-all duration-100 ease-out bg-[#C86D2D]"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Sisi Kiri: Brand Logo "whüut" + Badge EAU DE PARFUME • 35ML */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <a href="#top" className="flex items-center group py-1" aria-label="whuut">
              <div
                className={`h-10 w-10 sm:h-12 sm:w-12 aspect-square rounded-full overflow-hidden bg-white shrink-0 transition-all ${
                  darkMode ? 'ring-1 ring-[#F5F0DC]/30' : ''
                }`}
              >
                <img
                  src="/images/logo-whuut.jpeg"
                  alt="whuut"
                  className="w-full h-full object-cover scale-110 select-none"
                />
              </div>
            </a>

            {/* Badge EAU DE PARFUME • 35ML (Persis Gambar Referensi Header) */}
            <span
              className={`font-ui inline-flex items-center text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border whitespace-nowrap transition-colors ${darkMode
                ? 'border-[#262624] text-[#A09F99] bg-[#161615]'
                : 'border-[#141413]/20 text-[#5C5343] bg-[#FAF6E8]'
                }`}
            >
              <span className="hidden xs:inline">EAU DE PARFUME • </span>
              <span className="xs:hidden">EDP • </span>
              35ML
            </span>
          </div>

          {/* Sisi Tengah: Navigasi Desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-ui text-[14px] font-semibold">
            <button
              onClick={() => scrollToSection('katalog')}
              className={`transition-colors ${darkMode ? 'text-[#8E8D87] hover:text-[#F4F3EF]' : 'text-[#5C5343] hover:text-[#141413]'
                }`}
            >
              Koleksi
            </button>
            <button
              onClick={() => scrollToSection('cara-pesan')}
              className={`transition-colors ${darkMode ? 'text-[#8E8D87] hover:text-[#F4F3EF]' : 'text-[#5C5343] hover:text-[#141413]'
                }`}
            >
              Cara Pesan
            </button>
            <a
              href={STORE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${darkMode ? 'text-[#8E8D87] hover:text-[#F4F3EF]' : 'text-[#5C5343] hover:text-[#141413]'
                }`}
            >
              Shopee
            </a>
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${darkMode ? 'text-[#8E8D87] hover:text-[#F4F3EF]' : 'text-[#5C5343] hover:text-[#141413]'
                }`}
            >
              Instagram
            </a>
          </nav>

          {/* Sisi Kanan: Toggle Mode, Tombol Chat WA, dan Tombol Hamburger Menu HP/Tablet */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Ubah Tema Terang atau Gelap"
              className={`p-2 sm:p-2.5 rounded-full border transition-all duration-300 ${darkMode
                ? 'bg-[#161615] border-[#262624] text-[#F4F3EF] hover:border-[#454540]'
                : 'bg-[#FAF6E8] border-[#141413]/20 text-[#141413] hover:border-[#141413]'
                }`}
              title={darkMode ? 'Ubah ke Mode Terang' : 'Ubah ke Mode Gelap'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Tombol Chat WA */}
            <div className="relative inline-flex items-center">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[2px] rounded-full border border-[#25D366]/55 animate-wa-ring"
              />

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Halo ${STORE_CONFIG.brandName}, saya ingin tanya koleksi parfum 35ml-nya.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-ui text-[13px] sm:text-[14px] font-semibold flex items-center gap-1.5 sm:gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 bg-[#25D366] text-white hover:bg-[#1EBE5A] shadow-[0_4px_18px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_26px_rgba(37,211,102,0.45)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 w-full h-full animate-wa-sheen bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                <span className="relative flex items-center justify-center">
                  <WhatsAppIcon className="w-4 h-4 animate-wa-wiggle" />
                </span>

                <span className="relative font-ui font-bold whitespace-nowrap">
                  Chat WA
                </span>
              </a>
            </div>

            {/* Tombol Hamburger Menu (Hanya Tampil di HP & Tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-colors ${darkMode
                ? 'bg-[#161615] border-[#262624] text-[#F4F3EF]'
                : 'bg-[#FAF6E8] border-[#141413]/20 text-[#141413]'
                }`}
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t transition-all duration-300 ${darkMode
              ? 'bg-[#0E0E0D]/95 border-[#262624] text-[#F4F3EF]'
              : 'bg-[#F5F0DC]/98 border-[#D8D0BA] text-[#141413]'
              } px-4 py-4 space-y-3 backdrop-blur-md shadow-lg`}
          >
            <div className="flex flex-col space-y-1 font-ui text-[14px] font-semibold">
              <button
                onClick={() => {
                  scrollToSection('katalog');
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-3 rounded-xl transition-colors ${darkMode ? 'hover:bg-[#1C1B19]' : 'hover:bg-[#EDE6CE]'
                  }`}
              >
                Koleksi Parfum
              </button>
              <button
                onClick={() => {
                  scrollToSection('cara-pesan');
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-3 rounded-xl transition-colors ${darkMode ? 'hover:bg-[#1C1B19]' : 'hover:bg-[#EDE6CE]'
                  }`}
              >
                Cara Pesan & Standar Kemasan
              </button>
              <a
                href={STORE_CONFIG.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${darkMode ? 'hover:bg-[#1C1B19]' : 'hover:bg-[#EDE6CE]'
                  }`}
              >
                <span>Shopee Official</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${darkMode ? 'hover:bg-[#1C1B19]' : 'hover:bg-[#EDE6CE]'
                  }`}
              >
                <span>Instagram ({STORE_CONFIG.instagramHandle})</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            </div>

            <div className="pt-2 border-t border-inherit flex items-center justify-between font-ui text-[11px] text-[#8E8D87]">
              <span>whüut • Eau De Parfume 35ml</span>
              <span className="font-bold text-[#C86D2D]">Rp 85.000</span>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          2. HERO SECTION
      ==================================================================== */}
      <section
        id="top"
        ref={heroRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-10 sm:pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Kolom Kiri: Teks Headline */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4 overflow-hidden">
              <span
                className={`h-[1.5px] transition-all duration-700 ease-out ${isHeroVisible ? 'w-8 opacity-100' : 'w-0 opacity-0'
                  } ${darkMode ? 'bg-[#C86D2D]' : 'bg-[#141413]'}`}
              />
              <span
                className={`inline-block font-ui text-[11px] sm:text-[12px] font-bold uppercase transition-all duration-700 ease-out ${isHeroVisible
                  ? 'tracking-[0.18em] sm:tracking-[0.2em] opacity-100 translate-y-0'
                  : 'tracking-[0.04em] opacity-0 translate-y-3'
                  } ${darkMode ? 'text-[#A09F99]' : 'text-[#5C5343]'}`}
              >
                EAU DE PARFUME — KOLEKSI TETAP
              </span>
            </div>

            <h1 className="font-serif-title text-[40px] xs:text-[46px] sm:text-[58px] lg:text-[66px] font-semibold leading-[1.08] tracking-tight">
              <span className={`block ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'}`}>
                {heroLine1Words.map((word, idx) => (
                  <span
                    key={word}
                    className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-1"
                  >
                    <span
                      style={{ transitionDelay: `${80 + idx * 90}ms` }}
                      className={`inline-block transition-all duration-700 ease-out ${isHeroVisible
                        ? 'translate-y-0 rotate-0 opacity-100'
                        : 'translate-y-[115%] rotate-2 opacity-0'
                        }`}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>

              <span className={`block italic font-normal mt-0.5 ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'}`}>
                {heroLine2Words.map((word, idx) => {
                  const isLastWord = idx === heroLine2Words.length - 1;
                  return (
                    <span
                      key={word}
                      className="relative inline-block overflow-hidden align-bottom mr-[0.26em] pb-1.5"
                    >
                      <span
                        style={{ transitionDelay: `${320 + idx * 90}ms` }}
                        className={`inline-block transition-all duration-700 ease-out ${isHeroVisible
                          ? 'translate-y-0 rotate-0 opacity-100'
                          : 'translate-y-[115%] rotate-2 opacity-0'
                          }`}
                      >
                        {word}
                      </span>

                      {isLastWord && (
                        <span
                          style={{ transitionDelay: '650ms' }}
                          className={`
                            absolute bottom-1 left-0 h-[2px] w-full origin-left
                            transition-transform duration-700 ease-out
                            ${isHeroVisible ? 'scale-x-100' : 'scale-x-0'}
                            ${darkMode ? 'bg-[#F4F3EF]/60' : 'bg-[#141413]/70'}
                          `}
                        />
                      )}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p
              className={`font-body mt-5 text-[15px] sm:text-[16px] leading-[1.65] max-w-lg transition-all duration-700 delay-500 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                } ${darkMode ? 'text-[#9E9D97]' : 'text-[#4A4336]'}`}
            >
              Tanpa pilihan yang membingungkan. Pilih satu dari empat karakter utama{' '}
              <strong className={`font-ui font-bold ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'}`}>whüut</strong>{' '}
              (Introvert, Extrovert, Si Paling Corporate, atau Si Paling Sport) dalam kemasan 35ml seharga{' '}
              <strong className="font-ui font-bold text-[#C86D2D]">Rp 85.000</strong>, dan pesan langsung lewat WhatsApp, Shopee, atau Instagram.
            </p>
          </div>

          {/* Kolom Kanan: Pratinjau Stiker Botol */}
          <div
            style={{ transitionDelay: '250ms' }}
            className={`lg:col-span-5 flex flex-col items-center lg:items-end transition-all duration-700 ease-out ${isHeroVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-95'
              }`}
          >
            <div className="flex flex-col items-center w-full max-w-[300px]">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[659/754] flex items-center justify-center">
                {moodOptions.map((m) => {
                  const active = heroMood === m.id;
                  return (
                    <WhuutBottleLabel
                      key={m.id}
                      variant={m.id}
                      alt={`Label ${m.label}`}
                      loading="eager"
                      darkMode={darkMode}
                      className={`absolute inset-0 w-full h-full drop-shadow-md transition-opacity duration-500 ease-out select-none ${
                        active ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {moodOptions.map((m) => {
                  const active = heroMood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setHeroMood(m.id)}
                      className={`px-3 py-1.5 rounded-full font-ui text-[12px] font-semibold transition-all ${active
                        ? darkMode
                          ? 'bg-[#C86D2D] text-white scale-105'
                          : 'bg-[#141413] text-[#F5F0DC] shadow-xs scale-105'
                        : darkMode
                          ? 'bg-[#1C1B19] text-[#A09F99] hover:text-white border border-[#262624]'
                          : 'bg-[#EBE4CC] text-[#141413] hover:bg-[#E0D7B8]'
                        }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. KATALOG 4 PARFUM "whüut" (HARGA SERAGAM Rp 85.000)
      ==================================================================== */}
      <main id="katalog" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {PERFUMES.map((item, index) => (
            <PerfumeCard
              key={item.id}
              item={item}
              index={index}
              darkMode={darkMode}
              onSelectPerfume={setActivePerfume}
            />
          ))}
        </div>
      </main>

      {/* ====================================================================
          4. KELENGKAPAN PAKET & CARA PESAN
      ==================================================================== */}
      <section
        id="cara-pesan"
        ref={stepsRef}
        className={`border-t transition-colors duration-500 ${darkMode ? 'border-[#262624] bg-[#121211]' : 'border-[#D8D0BA] bg-[#EFE8D0]'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div
            className={`max-w-xl mb-10 transition-all duration-700 ease-out ${isStepsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
              }`}
          >
            <h2
              className={`font-serif-title text-[32px] sm:text-[40px] font-semibold leading-tight ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'
                }`}
            >
              Standar Kemasan & Cara Pemesanan
            </h2>
            <p
              className={`font-body mt-2 text-[15px] sm:text-[16px] leading-relaxed ${darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'
                }`}
            >
              Setiap botol <strong className="font-ui font-bold text-[#C86D2D]">whüut</strong> (<span className="font-ui font-semibold">Rp 85.000</span>) dikemas lengkap dan siap dikirim aman ke seluruh Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: '35ml Travel Friendly',
                desc: 'Konsentrasi Eau De Parfume dalam botol spray kaca 35ml yang praktis dibawa ke mana saja.',
              },
              {
                step: '02',
                title: 'Paket Lengkap Eksklusif',
                desc: 'Setiap pembelian mendapatkan Botol Spray Kaca + Box Eksklusif + Stiker Varian.',
              },
              {
                step: '03',
                title: 'Standar Keamanan Extra',
                desc: 'Pengemasan rapi dengan Bubble Wrap Berlapis Extra. Pesan langsung via WA, Shopee, atau IG.',
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
                className={`p-6 rounded-2xl border transition-all duration-700 ease-out ${isStepsVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
                  } ${darkMode
                    ? 'bg-[#161615] border-[#262624]'
                    : 'bg-[#FAF6E8] border-[#D8D0BA]'
                  }`}
              >
                <span className="font-ui text-[11px] sm:text-[12px] font-bold tracking-widest block mb-2 text-[#C86D2D]">
                  STANDAR {item.step}
                </span>
                <h3
                  className={`font-ui text-[17px] sm:text-[18px] font-bold ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'
                    }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`font-body mt-2 text-[14px] sm:text-[15px] leading-relaxed ${darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'
                    }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. MODAL DETAIL PRODUK LENGKAP
      ==================================================================== */}
      {activePerfume && (
        <div
          onClick={() => setActivePerfume(null)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl rounded-t-3xl sm:rounded-2xl border overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl transition-colors ${darkMode
              ? 'bg-[#161615] border-[#262624] text-[#F4F3EF]'
              : 'bg-[#FAF6E8] border-[#D8D0BA] text-[#141413]'
              }`}
          >
            {/* Gambar Header Modal */}
            <div className="relative aspect-[16/9] w-full bg-[#1E1E1C]">
              <img
                src={activePerfume.image}
                alt={activePerfume.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePerfume(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="font-ui px-3 py-1 rounded-full text-[12px] font-semibold bg-black/70 text-white backdrop-blur-xs">
                  {activePerfume.concentration} • {activePerfume.sizeLabel}
                </span>
              </div>
            </div>

            {/* Isi Detail Produk */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <span className="font-ui text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[#C86D2D]">
                    whüut #{activePerfume.number}
                  </span>
                  <h3
                    className={`font-serif-title text-[28px] xs:text-[32px] sm:text-[40px] font-semibold mt-0.5 leading-tight ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'
                      }`}
                  >
                    {activePerfume.name}
                  </h3>
                  <p
                    className={`font-serif-title text-[14px] xs:text-[15px] sm:text-[17px] italic font-normal mt-0.5 ${darkMode ? 'text-[#D0CFC9]' : 'text-[#5C5343]'
                      }`}
                  >
                    {activePerfume.tagline}
                  </p>
                </div>

                <div className="shrink-0 self-start">
                  <WhuutBottleLabel
                    variant={activePerfume.id}
                    alt={`Label ${activePerfume.name.replace(/\.$/, '')}`}
                    loading="eager"
                    darkMode={darkMode}
                    className="w-16 xs:w-20 sm:w-28 h-auto drop-shadow-xs"
                  />
                </div>
              </div>

              <p
                className={`font-body text-[15px] sm:text-[16px] leading-[1.65] ${darkMode ? 'text-[#B5B4AE]' : 'text-[#4A4336]'
                  }`}
              >
                {activePerfume.description}
              </p>

              {/* Susunan Notes Resmi */}
              <div
                className={`font-body text-[13px] sm:text-[14px] p-4 rounded-xl border space-y-3 ${darkMode
                  ? 'bg-[#121211] border-[#262624]'
                  : 'bg-[#F2ECD9] border-[#D8D0BA]'
                  }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-semibold ${darkMode ? 'text-[#8E8D87]' : 'text-[#141413]'}`}>
                    (Top) Notes :
                  </span>
                  <span className="font-medium text-right">
                    {activePerfume.notes.top.join(', ')}
                  </span>
                </div>
                <div
                  className={`border-t pt-2.5 flex items-center justify-between gap-4 ${darkMode ? 'border-[#262624]' : 'border-[#D8D0BA]'
                    }`}
                >
                  <span className={`font-semibold ${darkMode ? 'text-[#8E8D87]' : 'text-[#141413]'}`}>
                    (Middle) Notes :
                  </span>
                  <span className="font-medium text-right">
                    {activePerfume.notes.middle.join(', ')}
                  </span>
                </div>
                <div
                  className={`border-t pt-2.5 flex items-center justify-between gap-4 ${darkMode ? 'border-[#262624]' : 'border-[#D8D0BA]'
                    }`}
                >
                  <span className={`font-semibold ${darkMode ? 'text-[#8E8D87]' : 'text-[#141413]'}`}>
                    (Base) Notes :
                  </span>
                  <span className="font-medium text-right">
                    {activePerfume.notes.base.join(', ')}
                  </span>
                </div>
              </div>

              {/* Spesifikasi Ukuran, Kelengkapan Paket & Standar Keamanan */}
              <div
                className={`font-body text-[13px] sm:text-[14px] p-4 rounded-xl border space-y-2.5 ${darkMode
                  ? 'bg-[#121211] border-[#262624]'
                  : 'bg-[#F2ECD9] border-[#D8D0BA]'
                  }`}
              >
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C86D2D] shrink-0 mt-0.5" />
                  <div>
                    <span className={darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'}>
                      Ukuran Bersih & Konsentrasi:{' '}
                    </span>
                    <span className="font-semibold">
                      {activePerfume.sizeLabel} — {activePerfume.concentration}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Package className="w-4 h-4 text-[#C86D2D] shrink-0 mt-0.5" />
                  <div>
                    <span className={darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'}>
                      Kelengkapan Paket:{' '}
                    </span>
                    <span className="font-semibold">{activePerfume.packageInfo}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C86D2D] shrink-0 mt-0.5" />
                  <div>
                    <span className={darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'}>
                      Standar Keamanan:{' '}
                    </span>
                    <span className="font-semibold">{activePerfume.safetyStandard}</span>
                  </div>
                </div>
              </div>

              {/* Harga & Tombol Beli */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#5C5343]">
                    Harga Resmi (35ml)
                  </span>
                  <span
                    className={`font-ui text-[24px] sm:text-[28px] font-bold ${darkMode ? 'text-[#F4F3EF]' : 'text-[#141413]'
                      }`}
                  >
                    {formatPrice(activePerfume.price)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <a
                    href={createWhatsAppLink(activePerfume)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:col-span-6 py-3.5 px-4 rounded-xl font-ui text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors bg-[#25D366] text-white hover:bg-[#1EBE5A] shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Pesan via WhatsApp</span>
                  </a>

                  <a
                    href={activePerfume.shopeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sm:col-span-3 py-3.5 px-3 rounded-xl font-ui text-[13px] sm:text-[14px] font-semibold border flex items-center justify-center gap-1.5 transition-colors ${darkMode
                      ? 'border-[#262624] hover:border-[#454540] text-[#F4F3EF]'
                      : 'border-[#141413]/25 bg-[#FAF6E8] hover:border-[#141413] text-[#141413]'
                      }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shopee</span>
                  </a>

                  <a
                    href={STORE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sm:col-span-3 py-3.5 px-3 rounded-xl font-ui text-[13px] sm:text-[14px] font-semibold border flex items-center justify-center gap-1.5 transition-colors ${darkMode
                      ? 'border-[#262624] hover:border-[#454540] text-[#F4F3EF]'
                      : 'border-[#141413]/25 bg-[#FAF6E8] hover:border-[#141413] text-[#141413]'
                      }`}
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          6. FOOTER BERSIH
      ==================================================================== */}
      <footer
        ref={footerRef}
        className={`border-t transition-colors duration-500 ${darkMode ? 'border-[#262624] bg-[#0E0E0D]' : 'border-[#D8D0BA] bg-[#F5F0DC]'
          }`}
      >
        <div
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[12px] transition-all duration-700 ease-out ${isFooterVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
            }`}
        >
          <div className="flex items-center gap-3">
            <a href="#top" className="flex items-center group" aria-label="whuut">
              <div
                className={`h-12 w-12 sm:h-14 sm:w-14 aspect-square rounded-full overflow-hidden bg-white shrink-0 transition-all ${
                  darkMode ? 'ring-1 ring-[#F5F0DC]/30' : ''
                }`}
              >
                <img
                  src="/images/logo-whuut.jpeg"
                  alt="whuut"
                  className="w-full h-full object-cover scale-110 select-none"
                />
              </div>
            </a>
            <span className={darkMode ? 'text-[#8E8D87]' : 'text-[#5C5343]'}>
              © {new Date().getFullYear()} • Eau De Parfume 35ml
            </span>
          </div>

          <div className="flex items-center gap-6 font-ui text-[13px] font-semibold">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1.5 text-[#1EBE5A]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={STORE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Shopee Official
            </a>
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram ({STORE_CONFIG.instagramHandle})
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
