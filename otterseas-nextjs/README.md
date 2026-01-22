# Otterseas - Dive Sticker Shop

A Next.js e-commerce site for dive stickers with a shared cart across all pages.

## Project Structure

```
otterseas-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.js          # Global layout with CartProvider
│   │   ├── page.js            # Homepage (sticker builder)
│   │   ├── globals.css        # Global styles
│   │   └── stickers/
│   │       └── [slug]/
│   │           └── page.js    # Individual sticker pages
│   ├── components/
│   │   ├── CartDrawer.js      # Slide-out cart panel
│   │   ├── Header.js          # Site header with cart button
│   │   ├── MiniNav.js         # Navigate between stickers
│   │   └── ProductDetails.js  # Accordion for product specs
│   ├── context/
│   │   └── CartContext.js     # Global cart state
│   └── data/
│       └── stickers.js        # All sticker data
├── public/
│   └── logo.png               # Your logo (add this!)
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Setup Instructions

### 1. Upload to GitHub

1. Create a new repository on GitHub
2. Upload all these files maintaining the folder structure
3. Make sure to add your `logo.png` to the `/public` folder

### 2. Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

### 3. Local Development (Optional)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Configuration

### Update Shopify URLs

In `src/data/stickers.js`, update:
- `shopifyVariantId` for each sticker
- The checkout URL in `CartDrawer.js` and `page.js`

### Update Sticker Images

Replace the placeholder image paths with your Shopify CDN URLs:
```javascript
image: 'https://cdn.shopify.com/s/files/...'
```

### Update Story Content

Each sticker has a `story` object with:
- `headline` - The main story title
- `content` - The story text
- `designRationale` - Why you chose the design

## Features

- ✅ Shared cart across all pages (persists in localStorage)
- ✅ Slide-out cart drawer
- ✅ Tiered pricing (£2.50 / £1.75 / £1.50)
- ✅ Minimum order of 5 stickers
- ✅ Region-based navigation
- ✅ Individual sticker story pages
- ✅ Mobile responsive
- ✅ Smooth animations with Framer Motion

## Pages

- `/` - Sticker builder (select multiple stickers)
- `/stickers/[slug]` - Individual sticker pages (e.g., `/stickers/banda-sea`)

## Customization

### Colors

Edit `tailwind.config.js` to change brand colors:
```javascript
colors: {
  navy: '#0A2540',
  ochre: '#D99E30',
  teal: '#1a8a8a',
}
```

### Fonts

The site uses Montserrat. To change, update:
1. The `@import` in `globals.css`
2. The `fontFamily` in `tailwind.config.js`

## Support

For questions, contact [your-email@example.com]
