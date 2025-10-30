import React, { useState } from 'react';
import { ShoppingCart, Package, CreditCard, Truck, CheckCircle, MapPin, User, Phone, Mail, Eye, EyeOff, Heart, Menu, X, Home, LogOut, Search, Filter, Star, Camera, Play, Pause } from 'lucide-react';

export default function GladcartWebsite() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const [tryOnImage, setTryOnImage] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  const categories = ['All', 'Women', 'Men', 'Sports'];

  const products = [
    {
      id: 1,
      name: 'Summer Floral Dress',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
      rating: 4,
      reviews: 234,
      hub: 'Hub 3',
      category: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Beautiful floral print dress perfect for summer outings',
      tryOnImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=600&fit=crop'
    },
    {
      id: 2,
      name: 'Casual Denim Shirt',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      rating: 5,
      reviews: 456,
      hub: 'Hub 1',
      category: 'Men',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Classic denim shirt for casual everyday wear',
      tryOnImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Elegant Evening Gown',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1566479179814-8463c611b83b?w=400&h=400&fit=crop',
      rating: 5,
      reviews: 189,
      hub: 'Hub 2',
      category: 'Women',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Stunning evening gown for special occasions',
      tryOnImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=600&fit=crop'
    },
    {
      id: 4,
      name: 'Printed T-Shirt',
      price: 899,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      rating: 4,
      reviews: 678,
      hub: 'Hub 1',
      category: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Comfortable cotton t-shirt with trendy prints',
      tryOnImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=600&fit=crop'
    },
    {
      id: 5,
      name: 'Winter Jacket',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      rating: 5,
      reviews: 321,
      hub: 'Hub 3',
      category: 'Men',
      sizes: ['M', 'L', 'XL', 'XXL'],
      description: 'Warm and stylish jacket for winter season',
      tryOnImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=600&fit=crop'
    },
    {
      id: 6,
      name: 'Sports Shorts',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1506629905607-0b5b8b5b2b5?w=400&h=400&fit=crop',
      rating: 4,
      reviews: 567,
      hub: 'Hub 2',
      category: 'Sports',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Breathable shorts perfect for workouts',
      tryOnImage: 'https://images.unsplash.com/photo-1506629905607-0b5b8b5b2b5?w=300&h=600&fit=crop'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setUser({ name: loginForm.email.split('@')[0], email: loginForm.email });
      setCurrentPage('home');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.name && signupForm.email && signupForm.password && signupForm.phone) {
      setUser({ name: signupForm.name, email: signupForm.email, phone: signupForm.phone });
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setCurrentPage('login');
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size: selectedSize, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, change) => {
    setCart(cart.map(item => {
      if (item.id === productId && item.size === size) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const placeOrder = () => {
    const orderId = 'GC' + Math.floor(Math.random() * 1000000);
    const newOrder = {
      id: orderId,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString(),
      status: 'confirmed',
      address: checkoutForm
    };
    setOrders([newOrder, ...orders]);
    setCurrentOrderId(orderId);
    setCart([]);
    setCheckoutStep(4);
  };

  const startTryOn = (product) => {
    setTryOnImage(product.tryOnImage);
    setIsTryOnActive(true);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl inline-block mb-4">
            <ShoppingCart size={48} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GLADCART
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-purple-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const SignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl inline-block mb-4">
            <User size={48} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join GLADCART
          </h1>
          <p className="text-gray-600 mt-2">Create your account to start shopping</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={signupForm.name}
              onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={signupForm.email}
              onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={signupForm.phone}
              onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-xl">
              <ShoppingCart size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GLADCART
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <Home size={20} />
              <span>Home</span>
            </button>
            <button onClick={() => setCurrentPage('orders')} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <Package size={20} />
              <span>Orders</span>
            </button>
            <button onClick={() => setCurrentPage('profile')} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <User size={20} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative flex items-center gap-2 text-gray-700 hover:text-purple-600"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-700 hover:text-red-600">
              <LogOut size={20} />
            </button>
          </nav>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenu && (
          <nav className="md:hidden mt-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenu(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded">
              Home
            </button>
            <button onClick={() => { setCurrentPage('orders'); setMobileMenu(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded">
              Orders
            </button>
            <button onClick={() => { setCurrentPage('profile'); setMobileMenu(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded">
              Profile
            </button>
            <button onClick={() => { setCurrentPage('cart'); setMobileMenu(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded">
              Cart ({cart.length})
            </button>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">🚀 Revolutionary Shopping Experience</h2>
          <p className="text-xl mb-2">Virtual Try-On with AR/VR • Same-Day Delivery • AI-Powered Personalization</p>
          <p className="text-lg opacity-90">Welcome back, {user?.name}! 👋</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-3xl font-bold mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    wishlist.find(item => item.id === product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <Heart size={20} fill={wishlist.find(item => item.id === product.id) ? 'white' : 'none'} />
                </button>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  🔥 AR Try-On
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < product.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-purple-600">₹{product.price}</span>
                  <span className="text-sm text-orange-600 font-semibold">⚡ {product.hub}</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => startTryOn(product)}
                    className="w-full border-2 border-purple-600 text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Camera size={16} />
                    Try On
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isTryOnActive && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">AR Virtual Try-On</h3>
              <button
                onClick={() => setIsTryOnActive(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative mb-4">
              <img src={tryOnImage} alt="Try On" className="w-full h-96 object-cover rounded-lg" />
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
                <p className="text-sm">This is a simulated AR try-on. In a real app, this would use your camera and AR technology.</p>
              </div>
            </div>
            <button
              onClick={() => setIsTryOnActive(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
            >
              Close Try-On
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const CheckoutPage = () => {
    const steps = [
      { num: 1, name: 'Address', icon: MapPin },
      { num: 2, name: 'Payment', icon: CreditCard },
      { num: 3, name: 'Review', icon: CheckCircle }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Checkout</h2>

          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    checkoutStep >= s.num
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <s.icon size={20} />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    checkoutStep >= s.num ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {s.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                    checkoutStep > s.num ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            {checkoutStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Delivery Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={user?.name || "John Doe"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={user?.email || "john@example.com"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <textarea
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="House/Flat No, Building Name, Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Kolkata"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      value={checkoutForm.pincode}
                      onChange={(e) => setCheckoutForm({...checkoutForm, pincode: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="700001"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setCurrentPage('cart')}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Payment Method</h3>

                <div className="space-y-4 mb-6">
                  <div
                    onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: 'card'})}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      checkoutForm.paymentMethod === 'card'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-purple-600" />
                      <div>
                        <h4 className="font-semibold">Credit/Debit Card</h4>
                        <p className="text-sm text-gray-600">Pay securely with your card</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: 'upi'})}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      checkoutForm.paymentMethod === 'upi'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📱</div>
                      <div>
                        <h4 className="font-semibold">UPI Payment</h4>
                        <p className="text-sm text-gray-600">PhonePe, Google Pay, Paytm</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: 'cod'})}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      checkoutForm.paymentMethod === 'cod'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💵</div>
                      <div>
                        <h4 className="font-semibold">Cash on Delivery</h4>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Review Your Order</h3>

                <div className="space-y-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{checkoutForm.name || user?.name}</p>
                      <p className="text-sm text-gray-600">{checkoutForm.address}</p>
                      <p className="text-sm text-gray-600">{checkoutForm.city}, {checkoutForm.pincode}</p>
                      <p className="text-sm text-gray-600">{checkoutForm.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Payment Method</h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="capitalize font-medium">{checkoutForm.paymentMethod === 'card' ? 'Credit/Debit Card' : checkoutForm.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-3">
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-gray-600">Size: {item.size} | Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-semibold">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Order Summary</h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Delivery:</span>
                        <span className="text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>₹{subtotal}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 4 && (
              <div className="text-center">
                <div className="mb-6">
                  <CheckCircle className="mx-auto text-green-500" size={64} />
                  <h3 className="text-2xl font-bold mt-4">Order Confirmed!</h3>
                  <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <p className="text-lg font-semibold">Order ID: {currentOrderId}</p>
                  <p className="text-sm text-gray-600 mt-1">You will receive an email confirmation shortly.</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => { setCurrentPage('orders'); setCheckoutStep(1); }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    View Orders
                  </button>
                  <button
                    onClick={() => { setCurrentPage('home'); setCheckoutStep(1); }}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-600 font-bold">₹{item.price}</span>
                      <span className="text-sm text-gray-600">Size: {item.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ProductPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {selectedProduct ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-96 object-cover rounded-2xl shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < selectedProduct.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mb-4">₹{selectedProduct.price}</p>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex gap-2">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-purple-600 text-purple-600 bg-purple-50'
                          : 'border-gray-300 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => { addToCart(selectedProduct); setCurrentPage('cart'); }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => startTryOn(selectedProduct)}
                  className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  Try On Virtually
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
          </div>
        )}
      </div>
    </div>
  );

  const OrdersPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Your order history will appear here.</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                    <p className="text-gray-600">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{order.total}</p>
                    <p className={`text-sm font-semibold ${
                      order.status === 'confirmed' ? 'text-green-600' :
                      order.status === 'shipped' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Delivery Address</h4>
                  <p className="text-sm text-gray-600">{order.address.name}</p>
                  <p className="text-sm text-gray-600">{order.address.address}</p>
                  <p className="text-sm text-gray-600">{order.address.city}, {order.address.pincode}</p>
                  <p className="text-sm text-gray-600">{order.address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">My Profile</h2>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full">
              <User size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{user?.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Account Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Orders:</span>
                  <span className="font-semibold">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wishlist Items:</span>
                  <span className="font-semibold">{wishlist.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cart Items:</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'home':
        return <HomePage />;
      case 'cart':
        return <CartPage />;
      case 'product':
        return <ProductPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'orders':
        return <OrdersPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return renderCurrentPage();
}
