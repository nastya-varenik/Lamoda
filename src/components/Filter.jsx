import PropTypes from 'prop-types';

const Filter = ({ categories, colors, onFilterChange }) => {
  return (
    <div className="filter flex flex-col gap-4 p-5 bg-white border-2 border-primary-color rounded-lg shadow-md">
      {/* Фильтр по категориям (выпадающий список) */}
      <label className="flex flex-col">
        Category:
        <select
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      {/* Фильтр по цветам (чекбоксы) */}
      <div className="flex flex-col">
        <span>Color:</span>
        {colors.map((color) => (
          <label key={color} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={color}
              onChange={(e) => onFilterChange("color", e.target.value, e.target.checked)}
              className="form-checkbox text-primary-color"
            />
            {color}
          </label>
        ))}
      </div>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;