// Phase 1 

1. Create the Next.js app
Ran npx create-next-app@latest with your choices.
Because ecommerce-app already existed (from an earlier run), we created the new project in ecommerce-app-new so we didn’t overwrite anything.

2. Set your options
TypeScript → No → JavaScript (e.g. pages/_app.js, pages/index.js).
ESLint → Yes → ESLint is set up.
Tailwind → No → No Tailwind.
src/ directory → No → No src/; app lives in the project root.
App Router → No → We switched to Pages Router (see below).
Import alias → No → Removed the @/* alias from jsconfig.json.
3. Switch from App Router to Pages Router
The CLI had created an App Router app (with an app/ folder).
We removed the app/ folder and its files (layout.js, page.js, globals.css, page.module.css).
We added Pages Router:
pages/_app.js – root app component.
pages/index.js – home page.
4. Clean up the duplicate folder
You had two folders: ecommerce-app (old/wrong) and ecommerce-app-new (correct).
We deleted the old ecommerce-app folder (twice, after it reappeared) so only ecommerce-app-new remains.
5. Small tweaks
In package.json, the project name was set to ecommerce-app (the folder is still ecommerce-app-new).
What you have now
One project: C:\Users\hp\Desktop\PracticalTest-1\ecommerce-app-new
Stack: Next.js (Pages Router), JavaScript, ESLint, no Tailwind, no src/, no import alias.
Run it: cd ecommerce-app-new then npm run dev.



Summary of what’s in place (using ecommerce-app-new as the project folder):
1. Redux
npm install @reduxjs/toolkit react-redux was run in ecommerce-app-new.
2. Placeholder components
components/Navbar.js + Navbar.module.css
components/ProductCard.js + ProductCard.module.css
components/DashboardCard.js + DashboardCard.module.css
Each component returns null; CSS modules are empty.
3. Redux placeholders
redux/store.js – exports empty store object
redux/productsSlice.js – comment only: // products slice
redux/cartSlice.js – comment only: // cart slice
4. Pages
pages/cart.js – “Cart Page”
pages/dashboard.js – “Dashboard”
pages/product/[id].js – “Product Detail”
pages/index.js – replaced with “Home Page”
5. Global styles
styles/globals.css – box-sizing reset, system font, #f5f5f5 background, .container (max-width 1200px).
pages/_app.js – updated to import '../styles/globals.css'.
6. Next config
next.config.mjs – reactStrictMode: true and images.domains: ['fakestoreapi.com'] (kept as ESM with export default).
7. Removed
public/vercel.svg
public/next.svg
styles/Home.module.css and pages/api/ were not present, so nothing to delete there.
No Redux or component logic was added; only structure and base styles. Run the app with npm run dev from ecommerce-app-new.