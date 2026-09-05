import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetails } from './pages/ProductDetails';
import { SearchResults } from './pages/SearchResults';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { TrackOrder } from './pages/TrackOrder';
import { Login } from './pages/Login';
import { OTP } from './pages/OTP';
import { Wishlist } from './pages/Wishlist';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Account Pages
import { AccountOverview } from './pages/Account/AccountOverview';
import { Profile } from './pages/Account/Profile';
import { Addresses } from './pages/Account/Addresses';
import { Orders } from './pages/Account/Orders';
import { Loyalty } from './pages/Account/Loyalty';
import { Coupons } from './pages/Account/Coupons';
import { Notifications } from './pages/Account/Notifications';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900">
                    <Header />
                    <main className="flex-1">
                      <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/category/:slug" element={<CategoryPage />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/track-order" element={<TrackOrder />} />
                      <Route path="/track-order/:id" element={<TrackOrder />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/otp" element={<OTP />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* Account Routes */}
                      <Route path="/account" element={<AccountOverview />} />
                      <Route path="/account/profile" element={<Profile />} />
                      <Route path="/account/addresses" element={<Addresses />} />
                      <Route path="/account/orders" element={<Orders />} />
                      <Route path="/account/loyalty" element={<Loyalty />} />
                      <Route path="/account/coupons" element={<Coupons />} />
                      <Route path="/account/notifications" element={<Notifications />} />
                    </Routes>
                  </main>
                  <Footer />
                  <MobileBottomNav />
                </div>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
