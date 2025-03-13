import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Footer } from "./components/Footer/Footer";
import WhitePage from "./pages/WhitePage";
import { ScrollToTop } from "./utils/ScrollToTop";
import SearchProducts from "./pages/SearchProducts";
import Product from "./pages/Product";
import TodayDeals from "./pages/TodayDeals";
import SpecialOffers from "./pages/SpecialOffers";
import TrendingProducts from "./pages/TrendingProducts";
import CustomerServices from "./pages/CustomerServices";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Profile } from "./pages/Profile";
import Cart from "./components/common/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

function App() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className={isAuthPage ? "w-full min-h-screen" : ""}>
      {!isAuthPage && <Header />}
      <ScrollToTop />
      {/* <Cart/> */}
      <div className={isAuthPage ? "w-full" : "px-2 lg:px-20"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today-deals" element={<TodayDeals />} />
          <Route path="/special-offers" element={<SpecialOffers />} />
          <Route path="/trending-products" element={<TrendingProducts />} />
          <Route path="/customer-services" element={<CustomerServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/white-page" element={<WhitePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer className="w-full" />}
    </div>
  );
}

export default App;
