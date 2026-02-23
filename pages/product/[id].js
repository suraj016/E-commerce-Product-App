import Link from 'next/link';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../../redux/cartSlice';
import styles from './product.module.css';

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const [btnText, setBtnText] = useState('Add to Cart');

  function addItem() {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    setBtnText('Added!');
    setTimeout(() => setBtnText('Add to Cart'), 1500);
  }

  return (
    <div className="container">
      <Head>
        <title>ShopZone | {product.title}</title>
      </Head>
      <Link href="/" className={styles.backLink}>
        ← Back to shopping
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
          {product.rating && product.rating.rate != null && (
            <p className={styles.rating}>
              ⭐ {product.rating.rate} ({product.rating.count ?? 0} reviews)
            </p>
          )}
          <p className={styles.price}>${(product.price ?? 0).toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>
          <button type="button" onClick={addItem} className={styles.addBtn}>
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
