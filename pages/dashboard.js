import { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardCard from '../components/DashboardCard';
import {
  selectCartItemCount,
  selectCartTotal,
} from '../redux/cartSlice';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const products = useSelector((state) => state.products.items);
  const cartItemCount = useSelector(selectCartItemCount);
  const cartTotal = useSelector(selectCartTotal);
  const [sortAsc, setSortAsc] = useState(true);

  const sortedProducts = [...products].sort((a, b) => {
    return sortAsc ? a.price - b.price : b.price - a.price;
  });

  function handleSort() {
    setSortAsc(!sortAsc);
  }

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.subtitle}>Store overview</p>
      </div>

      <div className={styles.cardsRow}>
        <DashboardCard
          icon="📦"
          label="Total Products"
          value={products.length}
        />
        <DashboardCard
          icon="🛒"
          label="Items in Cart"
          value={cartItemCount}
        />
        <DashboardCard
          icon="💰"
          label="Cart Value"
          value={'$' + cartTotal.toFixed(2)}
        />
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.sectionTitle}>All Products</h2>
          <button onClick={handleSort} className={styles.sortBtn}>
            {sortAsc ? 'Sort: Low → High' : 'Sort: High → Low'}
          </button>
        </div>

        {products.length === 0 && (
          <p className={styles.noData}>
            No products loaded. Go to Home page first.
          </p>
        )}

        {products.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? styles.evenRow : undefined}
                  >
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>
                      <span className={styles.categoryBadge}>
                        {product.category}
                      </span>
                    </td>
                    <td className={styles.priceCell}>
                      ${product.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
