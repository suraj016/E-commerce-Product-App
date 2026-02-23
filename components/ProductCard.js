import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { addToCart } from '../redux/cartSlice';
import styles from './ProductCard.module.css';

export default function ProductCard({ id, title, price, image, category }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [btnText, setBtnText] = useState('Add to Cart');

  function handleAddToCart() {
    dispatch(addToCart({ id, title, price, image }));
    setBtnText('Added!');
    setTimeout(() => setBtnText('Add to Cart'), 1500);
  }

  function handleViewDetails() {
    router.push('/product/' + id);
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleViewDetails} className={styles.viewBtn}>
          View Details
        </button>
        <button onClick={handleAddToCart} className={styles.addBtn}>
          {btnText}
        </button>
      </div>
    </div>
  );
}
