import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./Components/App/Auth/Auth"
import { CartProvider } from "./Components/App/Context/CartProvider"
import { FavoriteProvider } from "./Components/App/Context/FavoriteProvider"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <AuthProvider>
    <CartProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </CartProvider>
  </AuthProvider>
)
