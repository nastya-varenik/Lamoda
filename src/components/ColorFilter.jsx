import PropTypes from 'prop-types';

const ColorFilter = ({ colors, onColorChange }) => {
  return (
    <div className="color-filter">
      <h3 className="text-lg font-bold mb-2">Цвет:</h3>
      <div className="color-options flex flex-col gap-2">
        {colors.map((color) => (
          <label key={color} className="color-option flex items-center gap-2">
            <input
              type="checkbox"
              value={color}
              onChange={(e) => onColorChange(color, e.target.checked)}
              className="w-5 h-5 border-2 border-primary-color rounded-md transition-colors duration-300"
            />
            <span className="text-text-color">{color}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

ColorFilter.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onColorChange: PropTypes.func.isRequired,
};

export default ColorFilter;