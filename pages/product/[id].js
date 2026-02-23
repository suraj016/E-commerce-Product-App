import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../../redux/cartSlice';
import styles from './product.module.css';

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const [btnText, setBtnText] = useState('Add to Cart');

  function handleAddToCart() {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    setBtnText('Added to Cart!');
    setTimeout(() => setBtnText('Add to Cart'), 1500);
  }

  return (
    <div className="container">
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <div className={styles.layout}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />
        </div>

        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>
          <button onClick={handleAddToCart} className={styles.addBtn}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const res = await fetch('https://fakestoreapi.com/products/' + id);
    const product = await res.json();

    if (product == null || product.id == null) {
      return { notFound: true };
    }

    return { props: { product } };
  } catch (e) {
    return { notFound: true };
  }
}
