import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import ProductCard from '../components/ProductCard';
import {
  setProducts,
  setSearchQuery,
  selectFilteredProducts,
} from '../redux/productsSlice';
import styles from './index.module.css';

export default function Home({ products }) {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.products.status);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  useEffect(() => {
    dispatch(setProducts(products || []));
  }, [products, dispatch]);

  function onSearch(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  return (
    <div className="container">
      <Head>
        <title>ShopZone | Home</title>
      </Head>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Browse</h1>
        <p className={styles.pageSubtitle}>Find something you like.</p>
        <input
          type="text"
          placeholder="Search by name..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={onSearch}
        />
      </div>

      {status === 'loading' && (
        <p className={styles.message}>Loading...</p>
      )}
      {status === 'failed' && (
        <p className={styles.message}>Something went wrong.</p>
      )}
      {status === 'succeeded' && filteredProducts.length === 0 && (
        <p className={styles.message}>No matches Do it again</p>
      )}

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price ?? 0}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    return { props: { products: products || [] } };
  } catch (e) {
    return { props: { products: [] } };
  }
}
