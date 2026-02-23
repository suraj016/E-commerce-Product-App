import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from '../redux/cartSlice';
import styles from './cart.module.css';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  function handleRemove(id) {
    dispatch(removeFromCart(id));
  }

  function handleQuantityChange(id, newQuantity) {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  }

  function handleClearCart() {
    const confirmed = window.confirm('Are you sure you want to clear the cart?');
    if (confirmed) dispatch(clearCart());
  }

  function handleCheckout() {
    alert('Feature coming soon!');
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Your Cart</h1>

      {cartItems.length === 0 && (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Link href="/" className={styles.continueLink}>
            ← Continue Shopping
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
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className={styles.qtyNumber}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p className={styles.itemSubtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.totalText}>Total: ${total.toFixed(2)}</p>
            <div className={styles.summaryButtons}>
              <button
                onClick={handleClearCart}
                className={styles.clearBtn}
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
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
