import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Components/App/Auth/Auth';
import { CartProvider } from './Components/App/Context/CartProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
);