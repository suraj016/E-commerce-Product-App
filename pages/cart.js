import Link from 'next/link';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from '../redux/cartSlice';
import styles from './cart.module.css';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  function removeItem(id) {
    dispatch(removeFromCart(id));
  }

  function changeQty(id, qty) {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  }

  function clearAll() {
    if (window.confirm('Clear everything from your cart?')) dispatch(clearCart());
  }

  function onCheckout() {
    alert('Checkout isn’t ready yet — coming soon.');
  }

  return (
    <div className="container">
      <Head>
        <title>ShopZone | Cart</title>
      </Head>
      <h1 className={styles.pageTitle}>Your Cart</h1>

      {cartItems.length === 0 && (
        <div className={styles.emptyCart}>
          <p>Nothing in your cart yet.</p>
          <Link href="/" className={styles.continueLink}>
            ← Go Back 
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className={styles.cartWrapper}>
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemPrice}>
                    ${(item.price ?? 0).toFixed(2)} each
                  </p>
                </div>
                <div className={styles.qtyControls}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => changeQty(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className={styles.qtyNumber}>{item.quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => changeQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className={styles.itemSubtotal}>
                  ${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                </p>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.totalText}>Total: ${(total ?? 0).toFixed(2)}</p>
            <div className={styles.summaryButtons}>
              <button
                type="button"
                onClick={clearAll}
                className={styles.clearBtn}
              >
                Clear Cart
              </button>
              <button
                type="button"
                onClick={onCheckout}
                className={styles.checkoutBtn}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
