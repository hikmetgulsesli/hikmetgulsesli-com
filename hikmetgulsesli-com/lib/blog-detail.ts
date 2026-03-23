import { BlogPost } from "@/lib/blog";

export interface BlogDetailPost extends BlogPost {
  content: string;
  author: {
    name: string;
    avatar: string;
    title: string;
    bio: string;
  };
}

export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export const blogDetails: Record<string, BlogDetailPost> = {
  "nextjs-app-router-derinlemesine": {
    slug: "nextjs-app-router-derinlemesine",
    title: "Next.js 14 App Router: Derinlemesine İnceleme",
    excerpt:
      "Next.js 14 ile gelen App Router mimarisini detaylıca inceliyoruz. Server Components, Server Actions ve yeni routing sistemini öğrenin.",
    featuredImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop",
    category: "teknik",
    tags: ["Next.js", "React", "TypeScript"],
    readTime: 8,
    publishedAt: "2024-06-16",
    status: "published",
    featured: true,
    pinned: true,
    content: `
## Giriş

Next.js 14 ile birlikte gelen App Router, React uygulamalarında köklü bir değişiklik getiriyor. Bu makalede, App Router'ın temel kavramlarını, Server Components avantajlarını ve migration sürecini detaylıca ele alacağız.

## App Router Nedir?

App Router, Next.js uygulamalarında yeni nesil routing sistemidir. Pages Router'ın üzerine inşa edilmiş olup, React'in en yeni özelliklerinden tam olarak yararlanmanızı sağlar.

### Server Components

React Server Components, bileşenlerinizi sunucu tarafında render etmenize olanak tanır. Bu sayede:

- **Daha küçük client bundle'ı** - JavaScript miktarı azalır
- **Direct database access** - API katmanı olmadan veritabanına erişim
- **Automatic code splitting** - Her route için sadece gerekli kod yüklenir

\`\`\`typescript
// app/posts/page.tsx
async function PostsPage() {
  // Bu bileşen sunucuda çalışır
  const posts = await db.posts.findMany();
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Layouts ve Templates

App Router'da layouts, sayfalar arasında paylaşılan UI'ları tanımlamanızı sağlar:

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

> **Önemli:** Layout'lar mount edildiklerinde yeniden mount edilmezler. Bu, React'in state koruma özelliğini kullanmanızı sağlar.

## Server Actions

Server Actions, form submit ve data mutation işlemlerini sunucu fonksiyonları olarak tanımlamanızı sağlar:

\`\`\`typescript
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  
  await db.posts.create({
    data: { title: title as string }
  });
  
  revalidatePath('/posts');
}
\`\`\`

## Routing Sistemi

### Dynamic Routes

Dinamik route segmentleri köşeli parantez ile tanımlanır:

- \`[id]\` - Tek segment için
- \`[...slug]\` - Catch-all segmentler için
- \`[[...slug]]\` - Optional catch-all için

\`\`\`typescript
// app/posts/[id]/page.tsx
export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);
  return <article>{post.title}</article>;
}
\`\`\`

## Performans İyileştirmeleri

App Router birçok performans iyileştirmesi sunar:

1. **Streaming** - Suspense ile kısmi yükleme
2. **Selective Hydration** - Sadece gerekli bileşenleri hydrate etme
3. **Improved Caching** - Daha akıllı önbellek sistemi

## Sonuç

Next.js 14 App Router, modern React geliştirme için güçlü bir temel sunuyor. Server Components ve Server Actions ile uygulamalarınızı hem daha performanslı hem de daha güvenli hale getirebilirsiniz.

Başlangıçta öğrenme eğrisi dik görünse de, uzun vadede sunduğu avantajlar bu yatırıma değer.
    `.trim(),
    author: {
      name: "Hikmet Güleşli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      title: "Full-Stack Developer",
      bio: "Modern web teknolojileri ile dijital ürünler geliştiriyorum. Özellikle React, Next.js ve TypeScript konularında uzmanlaşmışım.",
    },
  },
  "freelance-gelistirici-baslangic": {
    slug: "freelance-gelistirici-baslangic",
    title: "Freelance Yazılım Geliştirici: İlk Yılım",
    excerpt:
      "Tam zamanlı işden freelance'e geçiş sürecim, karşılaştığım zorluklar ve edindiğim deneyimler. 1 yıl sonra neler öğrendim?",
    category: "career",
    tags: ["Freelance", "Kariyer", "Deneyim"],
    readTime: 6,
    publishedAt: "2024-05-22",
    status: "published",
    featured: false,
    pinned: false,
    content: `
## Neden Freelance?

2023 yılının sonlarında, 5 yıllık kurumsal deneyimimden sonra freelance'e geçmeye karar verdim. Bu kararın arkasında birkaç temel faktör vardı:

- Daha fazla **zaman özerkliği** istiyordum
- Farklı projelerde çalışma arzusu
- Kendi işimi kurma hayali

### İlk Zorluklar

Freelance'in ilk ayları beklediğimden daha zorlu geçti. En büyük zorluklar:

> "Müşteri bulmak kadar, kendini tanıtmak da bir sanat."

1. **Gelir belirsizliği** - Ay sonunda ne kazanacağımı bilmiyordum
2. **Sosyal izolasyon** - Ofis ortamından uzaktım
3. **Scope creep** - Proje kapsamının sürekli genişlemesi

## Öğrendiğim Dersler

### 1. Fiyatlandırma Kritik

İlk projelerimi çok düşük fiyatlarla aldım. Bu hata, hem değersizleşmeme hem de yorucu çalışmama neden oldu.

\`\`\`
Kalite = Değer + Güven + Zaman
Fiyat = Kalite'nin yansımasıdır
\`\`\`

### 2. Sözleşme Şart

Her proje için mutlaka yazılı sözleşme hazırladım. Bu, hem beni hem de müşteriyi korudu.

### 3. Portföy Yönetimi

Aktif projeler arasında boğulmamak için:

- Haftalık maksimum 25 saat çalışma kuralı
- Her ay en az 1 gün "serbest" zaman
- Düzenli portföy güncellemesi

## Sonuç

Bir yıl sonra, freelance'in benim için doğru tercih olduğunu söyleyebilirim. Gelir esnekliği, zaman özerkliği ve sürekli öğrenme fırsatı, bu zorluklara değer.

**Tavsiyem:** Eğer freelance'e geçmeyi düşünüyorsanız, en az 6 aylık birikmiş birikmişiniz olduğundan emin olun.
    `.trim(),
    author: {
      name: "Hikmet Güleşli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      title: "Full-Stack Developer",
      bio: "Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    },
  },
  "typescript-utility-types": {
    slug: "typescript-utility-types",
    title: "TypeScript Utility Types: Kapsamlı Rehber",
    excerpt:
      "TypeScript'in en güçlü özelliklerinden biri olan Utility Types'ları detaylı örneklerle açıklıyorum. Partial, Required, Pick, Omit ve daha fazlası.",
    featuredImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=630&fit=crop",
    category: "teknik",
    tags: ["TypeScript", "JavaScript"],
    readTime: 5,
    publishedAt: "2024-04-10",
    status: "published",
    featured: false,
    pinned: false,
    content: `
## TypeScript Utility Types

TypeScript, mevcut tiplerden yeni tipler türetmek için güçlü yardımcı tipler sunar. Bu yazıda en sık kullanılan Utility Types'ları öğreneceğiz.

### Partial<T>

Bir tipin tüm özelliklerini isteğe bağlı hale getirir:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>;
// { id?: string; name?: string; email?: string; }
\`\`\`

### Required<T>

Bir tipin tüm özelliklerini zorunlu hale getirir:

\`\`\`typescript
interface Config {
  debug?: boolean;
  timeout?: number;
}

type FullConfig = Required<Config>;
// { debug: boolean; timeout: number; }
\`\`\`

### Pick<T, K>

Bir tipten belirli özellikleri seçer:

\`\`\`typescript
interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

type ArticlePreview = Pick<Article, 'id' | 'title'>;
// { id: string; title: string; }
\`\`\`

### Omit<T, K>

Bir tipten belirli özellikleri çıkarır:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
// { id: string; name: string; }
\`\`\`

### Record<K, V>

Anahtarları ve değerleri olan bir tip oluşturur:

\`\`\`typescript
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};
\`\`\`

## Sonuç

Utility Types, TypeScript kodunu daha type-safe ve yeniden kullanılabilir hale getirir. Bu tipleri aktif olarak kullanarak kod kalitenizi artırabilirsiniz.
    `.trim(),
    author: {
      name: "Hikmet Güleşli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      title: "Full-Stack Developer",
      bio: "Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    },
  },
  "uzaktan-calisma-dengesi": {
    slug: "uzaktan-calisma-dengesi",
    title: "Uzaktan Çalışma: İş-Yaşam Dengesi",
    excerpt:
      "Evden çalışırken üretkenliği korumak ve iş-yasam dengesini sağlamak için kullandığım yöntemler ve araçlar.",
    category: "kisisel",
    tags: ["Verimlilik", "Uzaktan Çalışma", "Yaşam"],
    readTime: 4,
    publishedAt: "2024-03-15",
    status: "published",
    featured: false,
    pinned: false,
    content: `
## Uzaktan Çalışma Gerçeği

Evden çalışma, 2020'den sonra birçok geliştirici için norm haline geldi. Ancak bu yeni düzen, kendine özgü zorlukları beraberinde getiriyor.

### Zorluklar

- **Sınırların kaybolması** - İş ve özel hayat iç içe geçiyor
- **Sosyal izolasyon** - Ofis arkadaşlarından uzaklık
- **Ev içi dikkat dağıtıcılar** - Aile, ev işleri, TV

### Kullandığım Yöntemler

#### 1. Zaman Bloklaması

Günümü belirli zaman bloklarına ayırıyorum:

\`\`\`
09:00 - 12:00 → Derin çalışma (odak gerektiren görevler)
12:00 - 13:00 → Öğle molası
13:00 - 17:00 → Meetings + Collaborative work
17:00 sonrası → Kişisel zaman
\`\`\`

#### 2. Fiziksel Alan

Sadece çalışmaya ayrılmış bir alan oluşturdum. Yatak odasında çalışmıyorum.

#### 3. Ritüeller

Güne başlarken ve bitirirken kullandığım küçük ritüeller var:

> Kahvemi yapıyorum, penceremi açıyorum, 5 dakika nefes alıyorum. Güncelle başlıyorum.

## Sonuç

Uzaktan çalışma, doğru stratejilerle hem üretken hem de dengeli olabilir. Önemli olan tutarlılık ve kendinize karşı dürüst olmak.
    `.trim(),
    author: {
      name: "Hikmet Güleşli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      title: "Full-Stack Developer",
      bio: "Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    },
  },
  "react-performans-optimizasyonu": {
    slug: "react-performans-optimizasyonu",
    title: "React Uygulamalarında Performans Optimizasyonu",
    excerpt:
      "React uygulamalarınızı hızlandırmak için useMemo, useCallback, React.memo ve code splitting kullanımı. Gerçek dünya örnekleriyle.",
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop",
    category: "tutorial",
    tags: ["React", "Performans", "TypeScript"],
    readTime: 7,
    publishedAt: "2024-02-28",
    status: "published",
    featured: false,
    pinned: false,
    content: `
## React Performans Problemleri

React uygulamaları büyüdükçe, performans sorunları kaçınılmaz hale gelir. Bu makalede, en sık karşılaşılan problemleri ve çözümlerini inceleyeceğiz.

### Gereksiz Re-renderlar

React'te en büyük performans düşmanı gereksiz re-render'lardır:

\`\`\`typescript
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Her count değiştiğinde ChildComponent re-render olur
  return <ChildComponent onClick={() => setCount(c => c + 1)} />;
}
\`\`\`

### useMemo Kullanımı

Maliyetli hesaplamaları önbelleğe almak için useMemo kullanılır:

\`\`\`typescript
function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  return filteredItems.map(item => <ListItem key={item.id} item={item} />);
}
\`\`\`

### useCallback Kullanımı

Callback fonksiyonlarını stable tutmak için useCallback kullanılır:

\`\`\`typescript
function SearchComponent({ onSearch }) {
  const handleSearch = useCallback((query: string) => {
    onSearch(query);
  }, [onSearch]);
  
  return <SearchBar onSearch={handleSearch} />;
}
\`\`\`

### React.memo

Bileşen seviyesinde re-render kontrolü için React.memo:

\`\`\`typescript
const MemoizedComponent = React.memo(function MyComponent({ data }) {
  return <div>{data.map(item => item.name)}</div>;
});
\`\`\`

## Sonuç

Performans optimizasyonu, erken aşamada değil ihtiyaç duyulduğunda yapılmalı. Premature optimization, kod karmaşıklığını artırabilir.
    `.trim(),
    author: {
      name: "Hikmet Güleşli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      title: "Full-Stack Developer",
      bio: "Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    },
  },
  "tam-suresiz-is-arası": {
    slug: "tam-suresiz-is-arası",
    title: "Tam Süresiz İş Arayışım: 6 Ayın Özeti",
    excerpt:
      "Türkiye'de yazılım geliştirici olarak tam süresiz iş arayışı sürecim. Mülakatlar, redler ve sonunda bulduğum fırsat.",
    category: "career",
    tags: ["Kariyer", "İş Arama", "Mülakat"],
    readTime: 5,
    publishedAt: "2024-01-20",
    status: "published",
    featured: false,
    pinned: false,
    content: `
## Neden Tam Süresiz?

2023 ortasında, tam süresiz iş aramaya karar verdim. Bu kararın arkasında birkaç neden vardı:

- Mevcut işimde ilerleme fırsatı göremiyordum
- Piyasa değerimi test etmek istiyordum
- Daha iyi bir ekip ve proje arıyordum

### Süreç

6 ay boyunca düzenli olarak iş başvurusu yaptım. Süreç şöyle gelişti:

#### Ay 1-2: Araştırma ve Hazırlık

- CV ve LinkedIn profilini güncelledim
- Teknik mülakat sorularını tekrar ettim
- 20+ şirkete başvurdum

#### Ay 3-4: Yoğun Dönem

> "Her red, bir sonraki mülakat için pratik oldu."

- Ortalama haftada 2-3 mülakat
- Teknik testler, coding challenge'lar
- Kültürel uyum görüşmeleri

#### Ay 5-6: Sonuç

- 5 final görüşmesi
- 2 teklif
- 1 kabul

## Öğrendiklerim

### 1. Sabır Kritik

İş aramak bir maraton. Hızlı sonuç beklentisi hayal kırıklığına yol açar.

### 2. Her Mülakat Bir Öğrenme

Red aldığım mülakatlardan bile geri bildirim istedim ve öğrendim.

### 3. Ağınızı Kullanın

Başvurduğum pozisyonların %40'ı referans ile geldi.

## Sonuç

6 ay zorlu ama öğretici bir süreçti. Sonunda hem maddi hem kariyer açısından daha iyi bir noktaya ulaştım.
    `.trim(),
    author: {
      name: "Hikmet Güleşli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      title: "Full-Stack Developer",
      bio: "Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    },
  },
};

export function getBlogDetail(slug: string): BlogDetailPost | undefined {
  return blogDetails[slug];
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogDetails);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogDetailPost[] {
  return Object.values(blogDetails)
    .filter((post) => post.slug !== currentSlug && post.category === category && post.status === "published")
    .slice(0, limit);
}

export function parseTOC(content: string): TOCItem[] {
  const items: TOCItem[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);

    if (h2Match) {
      const title = h2Match[1].trim();
      const id = slugify(title);
      items.push({ id, title, level: 2 });
    } else if (h3Match) {
      const title = h3Match[1].trim();
      const id = slugify(title);
      items.push({ id, title, level: 3 });
    }
  }

  return items;
}

function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  };
  return text
    .toLowerCase()
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
