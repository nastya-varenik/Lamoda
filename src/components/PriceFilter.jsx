import PropTypes from 'prop-types';

const PriceFilter = ({ onPriceChange }) => {
  return (
    <div className="price-filter flex gap-5">
      <h3 className="text-lg font-bold">Цена:</h3>
      <input
        type="number"
        placeholder="От"
        onChange={(e) => onPriceChange("min", e.target.value)}
        className="w-32 p-2 text-lg border-2 border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-pink-400"
      />
      <input
        type="number"
        placeholder="До"
        onChange={(e) => onPriceChange("max", e.target.value)}
        className="w-32 p-2 text-lg border-2 border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-pink-400"
      />
    </div>
  );
};

PriceFilter.propTypes = {
  onPriceChange: PropTypes.func.isRequired,
};

export default PriceFilter;