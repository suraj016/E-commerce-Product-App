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


/// Pahse 3 

components/ProductCard.js
Imports: useDispatch, useRouter, useState, addToCart, ProductCard.module.css
Props: id, title, price, image, category
State: btnText (default 'Add to Cart')
handleAddToCart: dispatch(addToCart({ id, title, price, image })), set 'Added!', reset after 1500ms
handleViewDetails: router.push('/product/' + id)
JSX: card → imageContainer (img) → info (category, title, price) → buttons (View Details, Add to Cart)
components/ProductCard.module.css
Styles for .card, .imageContainer, .image, .info, .category, .title, .price, .buttons, .viewBtn, .addBtn (including hover) as specified
pages/index.js
Imports: useEffect, useDispatch, useSelector, ProductCard, setProducts, setSearchQuery, selectFilteredProducts, index.module.css
getServerSideProps: Fetches https://fakestoreapi.com/products, returns { props: { products } }
Home: Uses dispatch, filteredProducts (selector), status; useEffect runs dispatch(setProducts(products)) with [products]
handleSearch: dispatch(setSearchQuery(event.target.value))
JSX: container → pageHeader (title “Products”, search input) → loading/failed/no-results messages → grid of ProductCard with key, id, title, price, image, category
pages/index.module.css
.pageHeader, .pageTitle, .searchBar, .searchBar:focus, .grid, .message, and the 480px media query for the grid
Flow
getServerSideProps loads products and passes them to Home.
useEffect pushes those products into Redux with setProducts(products) so status becomes 'succeeded' and the grid shows.
Search updates searchQuery via setSearchQuery; selectFilteredProducts filters by title and the grid updates.
ProductCard “View Details” goes to /product/[id]; “Add to Cart” dispatches addToCart and shows “Added!” briefly.
No TypeScript; plain JS only. Lint is clean. useState was not added to index.js because the spec didn’t use it there.

// overall summary 

1. Project setup
Next.js app in ecommerce-app-new: JavaScript, ESLint, no TypeScript/Tailwind, Pages Router, no src/, no import alias.
Config: package.json, next.config.mjs (reactStrictMode, images.domains: ['fakestoreapi.com']), eslint.config.mjs, .gitignore (node_modules, .next, .env).
Base styles: styles/globals.css (reset, .container), imported in _app.js.
Redux packages: @reduxjs/toolkit, react-redux installed.
Placeholder structure: Components (Navbar, ProductCard, DashboardCard) and pages (cart, dashboard, product/[id]) created as requested; duplicate ecommerce-app folder removed; missing package.json/config recreated when needed.
2. Redux
redux/store.js – configureStore with products and cart; loadCartFromStorage() for SSR-safe cart hydration; subscribe to persist cart to localStorage.
redux/productsSlice.js – State: items, status, error, searchQuery. Thunk: fetchProducts (fakestoreapi.com). Reducers: setSearchQuery, setProducts. Selectors: selectFilteredProducts, selectAllProducts, selectProductsStatus, selectProductsError.
redux/cartSlice.js – State: cartItems. Reducers: addToCart, removeFromCart, updateQuantity, clearCart. Selectors: selectCartItems, selectCartItemCount, selectCartTotal.
3. App shell & Navbar
pages/app.js – Imports Provider, store, globals.css, Navbar. Renders <Provider store={store}><Navbar /><Component {...pageProps} /></Provider>.
components/Navbar.js – Links: Home, Dashboard, Cart; active state from useRouter().pathname; cart badge from useSelector(selectCartItemCount).
components/Navbar.module.css – Sticky nav, logo “ShopZone”, links, cart badge, responsive styles.
4. Home page & ProductCard
pages/index.js – getServerSideProps fetches from https://fakestoreapi.com/products and passes products. On mount, useEffect dispatches setProducts(products). Search input dispatches setSearchQuery; list comes from selectFilteredProducts. Shows loading/failed/no-results messages and a grid of ProductCard.
pages/index.module.css – Header, title “Products”, search bar, responsive grid, message styles.
components/ProductCard.js – Props: id, title, price, image, category. “View Details” → router.push('/product/' + id). “Add to Cart” → dispatch(addToCart(...)), button shows “Added!” then resets.
components/ProductCard.module.css – Card layout, image container, info, price, view/add buttons and hover.
5. Git & GitHub
.gitignore added; node_modules removed from tracking; history rewritten with git filter-branch so the large file was removed; force-pushed to https://github.com/suraj016/E-commerce-Product-App.git on main.
Current project layout (relevant parts)
ecommerce-app-new/├── components/│   ├── Navbar.js + Navbar.module.css│   ├── ProductCard.js + ProductCard.module.css│   └── DashboardCard.js + DashboardCard.module.css (placeholder)├── pages/│   ├── _app.js│   ├── index.js + index.module.css│   ├── cart.js (placeholder: "Cart Page")│   ├── dashboard.js (placeholder: "Dashboard")│   └── product/[id].js (placeholder: "Product Detail")├── redux/│   ├── store.js│   ├── productsSlice.js│   └── cartSlice.js├── styles/│   └── globals.css├── next.config.mjs├── package.json└── .gitignore
Not built yet (by design)
Cart page – Real UI and cart logic (list, quantity, remove, total).
Product detail page – Data from ID, add to cart, back link.
Dashboard – Stats/cards (e.g. with DashboardCard).
Pagination – Comment in index.js: “TODO: add pagination later”.
In short: project is set up, Redux is wired, Navbar and Home (with SSR products, search, and ProductCard with add-to-cart and view-details) are done; cart, product detail, and dashboard pages are still placeholders.