# Jian Yong Estate

Website for new launch properties in Kuala Lumpur and Selangor, by Yap Jian Yong (IQI Realty).

Built with Next.js and hosted on Vercel. Every change saved to this repository goes live automatically within about a minute.

## Common edits (all on github.com, no coding tools needed)

Open the file on GitHub, click the pencil icon, make the change, then click **Commit changes**.

| To change… | Edit this file |
|---|---|
| Add, remove or update a project (price, size, address…) | `data/projects.json` |
| WhatsApp number, agency details, REN, default interest rate | `lib/site.js` |
| FAQ questions | `data/faq.json` |
| Glossary terms | `data/glossary.json` |
| MM2H tiers and state minimum prices | `data/mm2h.js` |
| Colours and fonts | `app/globals.css` (top of file) |

### Adding a project

Copy one project block in `data/projects.json` (from `{` to `}`), paste it after the last one with a comma between them, and change the values:

- `id`: the web address, e.g. `the-atas` → `/properties/the-atas`. Lowercase, hyphens, no spaces.
- `priceFrom` / `priceTo`: numbers only, no "RM" or commas, e.g. `825000`. Use `null` if not known.
- `bedrooms`, `sizeSqft`: `[min, max]`, e.g. `[3, 5]`. Use `null` if not known.
- `featured`: `true` to show it on the home page.
- `lat`, `lng`: position on the Map Search. Right-click the building in Google Maps and click the coordinates to copy them.
- `mapPin` (optional): `"3.1010,101.6840"` puts the project page's Google Map pin exactly on the building. Without it, the map searches the name and address.
- `images` (optional): upload photos to `public/projects/` (Add file → Upload files on GitHub), then list them, facade first: `"images": ["/projects/the-atas-1.jpg", "/projects/the-atas-2.jpg"]`. The first one becomes the cover on cards and the project page; the rest show as thumbnails. Keep each photo under about 500 KB (JPG or WebP, 1600 px wide is plenty).

If the site stops updating after an edit, the file usually has a missing comma or quote. Vercel's Deployments page shows the error line.

## Theme

- Soft Blue theme (version D): blue accent `#1557C0`, pale blue panels, rounded cards and pill buttons, Outfit headings with DM Sans text. All colours are the tokens at the top of `app/globals.css`.

## Price rule

- Always show the SPA price. Never show rebates, net prices or discounted prices.
- Show only the starting SPA price, never a price range. (`priceTo` is used behind the scenes for filters and the MM2H checker, and is never displayed.)

## Number rule

- Show every amount with thousands commas, e.g. 566,000 and 1,423 sq ft. Price boxes add the commas automatically as people type. Postcodes, phone numbers and years stay without commas.

## Photo rules

- Do not show layout or floor plan images on the website.

- Every project photo is shown in full, never cropped or enlarged, in a 16:9 frame with black bars at the sides. The same applies on the home cards, the Properties list and the project page.
- Every photo carries an "Artist impression only" label in the bottom-right corner, added automatically.
- Remove marketing wording (slogans, paragraphs, the developer's own "artist's illustration" tag) from renders before uploading. Keep signage that is part of the building.
- The first image in `images` is the facade and is used as the cover.

## Before going public

1. Fill in `agencyRegNo`, `agencyTel` and `ren` in `lib/site.js`.
2. Set `live: true` in `lib/site.js`. Until then Google is told not to index the site.
3. Set `url` in `lib/site.js` to your own domain.
4. Add the site to Google Search Console and submit `/sitemap.xml`.

## Running it on a computer (optional)

```
npm install
npm run dev
```
Then open http://localhost:3000.
