import PropTypes from 'prop-types';
import { useState } from 'react';

const ProductList = ({ products, onAddToCart, onRemoveFromCart }) => {
  const [cartItems, setCartItems] = useState({}); // Хранит количество товаров в корзине

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const count = prev[product.id] || 0;
      return { ...prev, [product.id]: count + 1 };
    });
    onAddToCart(product); // Уведомляем родительский компонент о добавлении товара
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prev) => {
      const count = prev[product.id] || 0;
      if (count > 0) {
        return { ...prev, [product.id]: count - 1 };
      }
      return prev;
    });
    onRemoveFromCart(product); // Уведомляем родительский компонент об удалении товара
  };

  if (products.length === 0) {
    return (
      <div className="no-results text-center text-lg font-bold text-gray-500">
        По вашему запросу ничего не найдено
      </div>
    );
  }

  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center max-w-7xl mx-auto p-5">
      {products.map((product) => {
        const count = cartItems[product.id] || 0;
        return (
          <div
            key={product.id}
            className="product-card bg-pink-100 border-2 border-pink-300 rounded-lg p-5 text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg border-b-2 border-pink-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <p className="text-lg font-bold text-pink-700 mt-2">${product.price}</p>
              <p className="text-sm text-gray-500">Цвет: {product.color}</p>
              <p className="text-sm text-gray-500">Рейтинг: {product.rating}</p>
              <p className="text-sm text-gray-500">Категория: {product.category}</p>
              {count === 0 ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart bg-pink-400 text-white px-3 py-1 rounded-lg mt-4 transition-colors duration-300 hover:bg-pink-500"
                >
                  Добавить в корзину
                </button>
              ) : (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="bg-pink-400 text-white px-3 py-1 rounded-l-lg transition-colors duration-300 hover:bg-pink-500"
                  >
                    -
                  </button>
                  <span className="text-pink-700 font-bold">{count}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-pink-400 text-white px-3 py-1 rounded-r-lg transition-colors duration-300 hover:bg-pink-500"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default ProductList;