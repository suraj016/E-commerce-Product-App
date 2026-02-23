import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  useEffect(() => {
    dispatch(setProducts(products));
  }, [products]);

  function handleSearch(event) {
    dispatch(setSearchQuery(event.target.value));
  }

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchBar}
          onChange={handleSearch}
        />
      </div>

      {status === 'loading' && (
        <p className={styles.message}>Loading...</p>
      )}
      {status === 'failed' && (
        <p className={styles.message}>Something went wrong.</p>
      )}
      {status === 'succeeded' && filteredProducts.length === 0 && (
        <p className={styles.message}>No products found.</p>
      )}

    
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return { props: { products } };
}
