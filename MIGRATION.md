# Міграція CRA → Next.js App Router

## Що змінилось

### Структура проєкту
| CRA | Next.js |
|-----|---------|
| `src/App.tsx` | `app/page.tsx` |
| `src/index.tsx` | `app/layout.tsx` |
| `public/` | `public/` (без змін) |
| `src/components/` | `components/` |
| `src/helpers.ts` | `lib/helpers.ts` |
| `src/types.ts` | `lib/types.ts` |
| `src/config.ts` | `lib/config.ts` |
| `src/theme.matherial.ts` | `lib/theme.ts` |

### Env змінні
Всі `REACT_APP_*` → `NEXT_PUBLIC_*`:
```
REACT_APP_API     → NEXT_PUBLIC_API
REACT_APP_SITE    → NEXT_PUBLIC_SITE
REACT_APP_PHONE   → NEXT_PUBLIC_PHONE
REACT_APP_EMAIL   → NEXT_PUBLIC_EMAIL
```

### SEO покращення
- `<Helmet>` → Next.js `Metadata` API в `app/layout.tsx` (серверний рендеринг!)
- `app/sitemap.ts` — автоматична генерація `/sitemap.xml`
- `app/robots.ts` — автоматична генерація `/robots.txt`
- Всі `'use client'` компоненти явно позначені

### MUI + Next.js
Обгортка `AppRouterCacheProvider` з `@mui/material-nextjs` в `app/layout.tsx` — усуває hydration mismatch.

## Встановлення

```bash
# Скопіюй .env.local.example → .env.local і заповни значення
cp .env.local.example .env.local

npm install
npm run dev
```

## Деплой на Vercel
1. Завантаж проєкт на GitHub
2. Підключи репо до Vercel
3. Додай env змінні в Vercel Dashboard → Settings → Environment Variables
4. Vercel автоматично розпізнає Next.js і задеплоїть

## Наступний крок: Блог для SEO

Створи `app/blog/page.tsx` — список статей  
Створи `app/blog/[slug]/page.tsx` — окрема стаття

Кожна стаття = окрема сторінка з SSG → повноцінна індексація Гуглом.

```
app/
  blog/
    page.tsx          ← /blog
    [slug]/
      page.tsx        ← /blog/sho-take-gpon-internet
```
