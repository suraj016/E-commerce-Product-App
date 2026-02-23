import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <footer style={{ textAlign: 'center', padding: '24px', color: '#888', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} ShopZone
      </footer>
    </Provider>
  );
}
