import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../redux/cartSlice';
import styles from './Navbar.module.css';

function Navbar() {
  const router = useRouter();
  const cartCount = useSelector(selectCartItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          ShopZone
        </Link>
        <div className={styles.navLinks}>
          <Link
            href="/"
            className={router.pathname === '/' ? styles.active : undefined}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={router.pathname === '/dashboard' ? styles.active : undefined}
          >
            Dashboard
          </Link>
          <div className={styles.cartWrapper}>
            <Link
              href="/cart"
              className={router.pathname === '/cart' ? styles.active : undefined}
            >
              Cart
            </Link>
            {mounted && cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar