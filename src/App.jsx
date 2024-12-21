import { useState, useMemo } from "react";
import { generateProducts } from "../src/components/dataGenerator";
import ProductList from "../src/components/ProductList";
import Search from "../src/components/Search";
import Sort from "../src/components/Sort";
import Filter from "../src/components/Filter";
import logo from "../src/assets/logo.png"; // Импорт логотипа

const App = () => {
  const [products] = useState(generateProducts(50));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [cartItems, setCartItems] = useState({}); // Хранит количество товаров в корзине

  // Обработчик поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Обработчик изменения фильтров
  const handleFilterChange = (key, value, isChecked = true) => {
    if (key === "category") {
      setSelectedCategory(value);
    }
    if (key === "color") {
      setSelectedColors((prev) =>
        isChecked ? [...prev, value] : prev.filter((c) => c !== value)
      );
    }
  };

  // Обработчик изменения сортировки
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Обработчик добавления товара в корзину
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const count = prev[product.id] || 0;
      return { ...prev, [product.id]: count + 1 };
    });
  };

  // Обработчик удаления товара из корзины
  const handleRemoveFromCart = (product) => {
    setCartItems((prev) => {
      const count = prev[product.id] || 0;
      if (count > 0) {
        return { ...prev, [product.id]: count - 1 };
      }
      return prev;
    });
  };

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;
      return matchesSearch && matchesColor && matchesCategory;
    });
  }, [products, searchQuery, selectedColors, selectedCategory]);

  // Сортировка товаров
  const sortedProducts = useMemo(() => {
    if (sortBy === "price-asc") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating-desc") {
      return [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "name-asc") {
      return [...filteredProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    return filteredProducts;
  }, [filteredProducts, sortBy]);

  const colors = Array.from(new Set(products.map((p) => p.color)));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Подсчет общего количества товаров в корзине
  const totalCartItems = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  return (
    <div className="bg-secondary-color text-text-color font-sans min-h-screen">
      <div className="app p-5 text-center">
        {/* Логотип и название */}
        <div className="flex items-center justify-center mb-5">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-3" />
          <h1 className="text-primary-color text-4xl font-bold">Lamoda Shop</h1>
        </div>

        {/* Иконка корзины */}
        <div className="cart-icon fixed top-5 right-5 bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
          <span>{totalCartItems}</span>
        </div>

        {/* Поиск и сортировка */}
        <div className="search-sort-wrapper flex flex-col items-center gap-5 max-w-6xl mx-auto p-5">
          <Search onSearch={handleSearch} />
          <Sort onSortChange={handleSortChange} activeSort={sortBy} />
        </div>

        {/* Основной контент */}
        <div className="main-content flex flex-col lg:flex-row gap-5">
          {/* Левая панель с фильтрами */}
          <div className="left-filters flex-1 p-5 bg-white border-2 border-primary-color rounded-lg shadow-md">
            <Filter
              categories={categories}
              colors={colors}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Список товаров */}
          <div className="product-list-container flex-3 p-5">
            <ProductList
              products={sortedProducts}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart} // Передаем обработчик удаления
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;