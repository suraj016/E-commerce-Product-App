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

// Phase 2 

redux/productsSlice.js
State: items, status ('idle' | 'loading' | 'succeeded' | 'failed'), error, searchQuery
Thunk: fetchProducts – GETs https://fakestoreapi.com/products, console.log('fetching products...'), returns JSON
extraReducers: pending → loading, fulfilled → succeeded + set items, rejected → failed + set error
Reducers: setSearchQuery, setProducts
Selectors: selectFilteredProducts (filters by searchQuery), selectAllProducts, selectProductsStatus, selectProductsError
Exports: fetchProducts, setSearchQuery, setProducts, selectors, default productsReducer
redux/cartSlice.js
State: cartItems: [] (each item: { id, title, price, image, quantity })
Reducers: addToCart (increment if exists, else push with quantity 1), removeFromCart (filter by id), updateQuantity (by id, min 1), clearCart
Selectors: selectCartItems, selectCartItemCount (reduce over quantity), selectCartTotal (price×quantity, .toFixed(2) then parseFloat)
Exports: action creators, selectors, default cartReducer
redux/store.js
Imports: productsReducer, cartReducer
loadCartFromStorage(): try/catch, localStorage.getItem('cart'), parse; returns { cartItems: parsedData } or undefined; guards typeof window === 'undefined' for SSR
configureStore: products and cart reducers; preloadedState only set when loadCartFromStorage() returns data (avoids cart: undefined)
subscribe: on change, write store.getState().cart.cartItems to localStorage.setItem('cart', ...) in try/catch
Export: default store
Redux is ready. To use it in the app, wrap it with Provider in pages/_app.js (e.g. import store and Provider from react-redux, then <Provider store={store}>). I can add that wiring in _app.js if you want.



// Phase 2 



pages/app.js
- Imports: Provider (react-redux), store (redux/store), globals.css, Navbar
Wraps the app in <Provider store={store}>, renders <Navbar /> above <Component {...pageProps} />
components/Navbar.js
Imports: Link, useRouter, useSelector, selectCartItemCount, Navbar.module.css
Uses router.pathname and cartCount from Redux
Layout: <nav> → <div className={styles.navInner}>
Left: <Link href="/" className={styles.logo}>ShopZone</Link>
Right: <div className={styles.navLinks}> with three links:
Home → / with active when pathname === '/'
Dashboard → /dashboard with active when pathname === '/dashboard'
Cart → /cart inside <div className={styles.cartWrapper}>, with <span className={styles.badge}>{cartCount}</span> only when cartCount > 0, and active when pathname === '/cart'
components/Navbar.module.css
Matches your spec: .nav, .navInner, .logo, .navLinks, .navLinks a, .navLinks a:hover, .active, .cartWrapper, .badge, and the @media (max-width: 600px) block
No new linter issues. Run the app and the navbar will show on every page with active link styling and a cart badge when the cart has items.